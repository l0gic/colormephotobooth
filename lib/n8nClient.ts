// N8N Webhook Client for ColorMe Booth

import type {
  LeadData,
  LeadResponse,
  ChatbotRequest,
  ChatbotResponse,
} from './chatTypes';

// ============================================================================
// CONFIGURATION
// ============================================================================

const N8N_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_N8N_BASE_URL || '',
  endpoints: {
    leadCapture: process.env.NEXT_PUBLIC_N8N_LEAD_WEBHOOK_URL || '',
    chatbot: process.env.NEXT_PUBLIC_N8N_CHATBOT_WEBHOOK_URL || '',
    contactForm: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '',
  },
  timeout: 30000, // 30 seconds
};

// ============================================================================
// ERROR CLASSES
// ============================================================================

export class N8NClientError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'N8NClientError';
  }
}

export class NetworkError extends N8NClientError {
  constructor(message: string = 'Network request failed', details?: unknown) {
    super(message, 'NETWORK_ERROR', undefined, details);
    this.name = 'NetworkError';
  }
}

export class ValidationError extends N8NClientError {
  constructor(message: string, details?: unknown) {
    super(message, 'VALIDATION_ERROR', 400, details);
    this.name = 'ValidationError';
  }
}

export class WebhookError extends N8NClientError {
  constructor(message: string, statusCode: number, details?: unknown) {
    super(message, 'WEBHOOK_ERROR', statusCode, details);
    this.name = 'WebhookError';
  }
}

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateLeadData(data: LeadData): void {
  if (!data.name?.trim()) {
    throw new ValidationError('Name is required');
  }

  if (!data.email?.trim()) {
    throw new ValidationError('Email is required');
  }

  if (!validateEmail(data.email)) {
    throw new ValidationError('Please enter a valid email address');
  }

  if (!data.source) {
    throw new ValidationError('Source is required');
  }

  if (!data.event_type) {
    throw new ValidationError('Event type is required');
  }

  if (!data.page_url) {
    throw new ValidationError('Page URL is required');
  }
}

function validateChatbotRequest(data: ChatbotRequest): void {
  if (!data.session_id?.trim()) {
    throw new ValidationError('Session ID is required');
  }

  if (!data.message?.trim()) {
    throw new ValidationError('Message is required');
  }

  if (!data.page_url) {
    throw new ValidationError('Page URL is required');
  }

  if (!data.event_type) {
    throw new ValidationError('Event type is required');
  }
}

// ============================================================================
// HTTP HELPERS
// ============================================================================

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new NetworkError('Request timeout - please try again');
    }
    throw new NetworkError('Network request failed', error);
  }
}

// ============================================================================
// LEAD CAPTURE API
// ============================================================================

/**
 * Submit lead data to N8N webhook
 * @param data - Lead data to submit
 * @returns Promise with lead response
 */
export async function submitLead(data: LeadData): Promise<LeadResponse> {
  // Validate input
  validateLeadData(data);

  // Check webhook URL
  const webhookUrl = N8N_CONFIG.endpoints.leadCapture || N8N_CONFIG.endpoints.contactForm;
  if (!webhookUrl) {
    throw new N8NClientError('N8N webhook URL not configured', 'CONFIG_ERROR');
  }

  // Add timestamp if not provided
  const payload = {
    ...data,
    timestamp: data.timestamp || new Date().toISOString(),
  };

  try {
    const response = await fetchWithTimeout(
      webhookUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
      N8N_CONFIG.timeout
    );

    if (!response.ok) {
      let errorDetails = 'Unknown error';
      try {
        const errorData = await response.json();
        errorDetails = errorData.message || errorData.error || JSON.stringify(errorData);
      } catch {
        errorDetails = await response.text();
      }
      throw new WebhookError(
        `Webhook returned error: ${errorDetails}`,
        response.status,
        errorDetails
      );
    }

    // Parse response
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const responseData = await response.json();
      return {
        success: true,
        lead_id: responseData.lead_id,
        message: responseData.message,
        lead_score: responseData.lead_score,
      };
    }

    // Non-JSON response considered successful
    return { success: true };

  } catch (error) {
    if (error instanceof N8NClientError) {
      throw error;
    }
    throw new NetworkError('Failed to submit lead', error);
  }
}

/**
 * Submit lead from contact form
 * @param formData - Form data from contact form
 * @param eventType - Event type for the lead
 * @param pageUrl - URL of the page where form was submitted
 * @returns Promise with lead response
 */
export async function submitContactFormLead(
  formData: {
    name: string;
    email: string;
    venue: string;
    message: string;
  },
  eventType: string,
  pageUrl: string
): Promise<LeadResponse> {
  return submitLead({
    source: 'contact_form',
    event_type: eventType as any,
    name: formData.name,
    email: formData.email,
    venue: formData.venue,
    message: formData.message,
    page_url: pageUrl,
    timestamp: new Date().toISOString(),
  });
}

// ============================================================================
// CHATBOT API
// ============================================================================

/**
 * Send message to N8N chatbot
 * @param request - Chatbot request with message and context
 * @returns Promise with chatbot response
 */
export async function sendChatMessage(
  request: ChatbotRequest
): Promise<ChatbotResponse> {
  // Validate input
  validateChatbotRequest(request);

  // Check webhook URL
  const webhookUrl = N8N_CONFIG.endpoints.chatbot;
  if (!webhookUrl) {
    throw new N8NClientError('Chatbot webhook URL not configured', 'CONFIG_ERROR');
  }

  try {
    const response = await fetchWithTimeout(
      webhookUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      },
      N8N_CONFIG.timeout
    );

    if (!response.ok) {
      let errorDetails = 'Unknown error';
      try {
        const errorData = await response.json();
        errorDetails = errorData.message || errorData.error || JSON.stringify(errorData);
      } catch {
        errorDetails = await response.text();
      }
      throw new WebhookError(
        `Chatbot webhook returned error: ${errorDetails}`,
        response.status,
        errorDetails
      );
    }

    const responseData = await response.json();
    return {
      response: responseData.response || responseData.message || 'Sorry, I couldn\'t process that message.',
      session_id: responseData.session_id || request.session_id,
      lead_capture_prompt: responseData.lead_capture_prompt,
      should_capture_lead: responseData.should_capture_lead,
      suggested_questions: responseData.suggested_questions,
    };

  } catch (error) {
    if (error instanceof N8NClientError) {
      throw error;
    }
    throw new NetworkError('Failed to send chat message', error);
  }
}

/**
 * Generate a unique session ID for chat
 * @returns A unique session ID
 */
export function generateSessionId(): string {
  return `chat_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Get or create a chat session ID from localStorage
 * @returns Existing or new session ID
 */
export function getChatSessionId(): string {
  if (typeof window === 'undefined') {
    return generateSessionId();
  }

  const storageKey = 'colorme_chat_session_id';
  let sessionId = localStorage.getItem(storageKey);

  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem(storageKey, sessionId);
  }

  return sessionId;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get the current page URL
 * @returns Current page URL
 */
export function getCurrentPageUrl(): string {
  if (typeof window === 'undefined') {
    return '';
  }
  return window.location.href;
}

/**
 * Extract event type from URL path
 * @returns Event type or 'kiddie-party' as default
 */
export function extractEventTypeFromPath(): string {
  if (typeof window === 'undefined') {
    return 'kiddie-party';
  }

  const path = window.location.pathname.toLowerCase();

  if (path.includes('/weddings')) return 'weddings';
  if (path.includes('/debuts')) return 'debuts';
  if (path.includes('/corporate-event')) return 'corporate-event';
  if (path.includes('/kiddie-party')) return 'kiddie-party';

  return 'kiddie-party'; // Default
}

/**
 * Check if N8N webhooks are configured
 * @returns true if webhooks are configured
 */
export function isN8NConfigured(): boolean {
  return !!(
    N8N_CONFIG.endpoints.leadCapture ||
    N8N_CONFIG.endpoints.contactForm
  );
}

/**
 * Check if chatbot is configured
 * @returns true if chatbot webhook is configured
 */
export function isChatbotConfigured(): boolean {
  return !!N8N_CONFIG.endpoints.chatbot;
}

// ============================================================================
// CLIENT-SIDE HELPER FOR COMPONENTS
// ============================================================================

/**
 * Hook-friendly N8N client for React components
 */
export const n8nClient = {
  submitLead,
  submitContactFormLead,
  sendChatMessage,
  generateSessionId,
  getChatSessionId,
  getCurrentPageUrl,
  extractEventTypeFromPath,
  isN8NConfigured,
  isChatbotConfigured,
};

export default n8nClient;
