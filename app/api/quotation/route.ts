import { NextRequest, NextResponse } from 'next/server';

// Types for quotation request
interface QuotationRequest {
  name: string;
  email: string;
  venue: string;
  message: string;
  event_type?: string;
  page_url?: string;
  source?: string;
}

interface N8NResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

// Validation helper
function validateQuotationData(data: QuotationRequest): { valid: boolean; error?: string } {
  if (!data.name || data.name.trim().length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    return { valid: false, error: 'Invalid email address' };
  }

  if (!data.venue || data.venue.trim().length < 2) {
    return { valid: false, error: 'Venue information is required' };
  }

  if (!data.message || data.message.trim().length < 2) {
    return { valid: false, error: 'Please tell us about your event' };
  }

  return { valid: true };
}

// POST handler for quotation requests
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: QuotationRequest = await request.json();

    // Validate input data
    const validation = validateQuotationData(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Get webhook URL and API key from environment variables
    const webhookUrl = process.env.N8N_RESERVATIONS_WEBHOOK_URL;
    const apiKey = process.env.N8N_RESERVATIONS_API_KEY;

    if (!webhookUrl) {
      console.error('N8N_RESERVATIONS_WEBHOOK_URL not configured');
      return NextResponse.json(
        { success: false, error: 'Service configuration error' },
        { status: 500 }
      );
    }

    if (!apiKey) {
      console.error('N8N_RESERVATIONS_API_KEY not configured');
      return NextResponse.json(
        { success: false, error: 'Service authentication error' },
        { status: 500 }
      );
    }

    // Prepare payload for N8N
    const n8nPayload = {
      name: body.name.trim(),
      email: body.email.trim(),
      venue: body.venue.trim(),
      message: body.message.trim(),
      event_type: body.event_type || 'general',
      page_url: body.page_url || 'Unknown',
      source: body.source || 'quotation_form',
      submitted_at: new Date().toISOString(),
    };

    console.log('[Quotation API] Sending to N8N:', {
      name: n8nPayload.name,
      email: n8nPayload.email,
      event_type: n8nPayload.event_type,
    });

    // Call N8N webhook with authentication
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'X-API-Key': apiKey, // Alternative header for some N8N setups
      },
      body: JSON.stringify(n8nPayload),
    });

    // Check if request was successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Quotation API] N8N webhook error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });

      return NextResponse.json(
        {
          success: false,
          error: `Failed to process quotation request (${response.status})`,
        },
        { status: response.status }
      );
    }

    // Parse N8N response
    const n8nResponse: N8NResponse = await response.json();

    console.log('[Quotation API] N8N response:', n8nResponse);

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Quotation request submitted successfully',
      data: n8nResponse,
    });
  } catch (error) {
    console.error('[Quotation API] Error processing request:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// OPTIONS handler for CORS preflight
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}
