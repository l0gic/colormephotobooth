// Chat Types for N8N Chatbot Integration

// ============================================================================
// LEAD DATA TYPES
// ============================================================================

export type LeadSource = 'contact_form' | 'chatbot' | 'book_now';

export type EventType = 'kiddie_party' | 'wedding' | 'debut' | 'corporate';

export type LeadStatus = 'new' | 'contacted' | 'followed_up' | 'converted' | 'cold';

export interface LeadData {
  source: LeadSource;
  event_type: EventType;
  name: string;
  email: string;
  phone?: string;
  event_date?: string;
  venue?: string;
  package_interest?: string;
  message?: string;
  page_url: string;
  timestamp: string;
}

export interface LeadResponse {
  success: boolean;
  lead_id?: string;
  message?: string;
  lead_score?: number;
}

// ============================================================================
// CHAT MESSAGE TYPES
// ============================================================================

export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  role: ChatRole;
  content: string;
  timestamp?: string;
}

export interface ChatSession {
  session_id: string;
  page_url: string;
  event_type: EventType;
  messages: ChatMessage[];
  status: 'active' | 'idle' | 'lead_captured';
  lead_captured: boolean;
  lead_id?: string;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// CHATBOT REQUEST/RESPONSE TYPES
// ============================================================================

export interface ChatbotRequest {
  session_id: string;
  message: string;
  page_url: string;
  event_type: EventType;
  conversation_history?: ChatMessage[];
}

export interface ChatbotResponse {
  response: string;
  session_id: string;
  lead_capture_prompt?: boolean;
  should_capture_lead?: boolean;
  suggested_questions?: string[];
}

// ============================================================================
// CHAT WIDGET STATE TYPES
// ============================================================================

export type ChatWidgetState = 'closed' | 'minimized' | 'open';

export interface ChatWidgetConfig {
  autoOpenDelay?: number; // milliseconds
  position?: 'bottom-right' | 'bottom-left';
  theme?: 'light' | 'dark';
  primaryColor?: string;
  showOnPages?: EventType[]; // Which pages to show on
}

// ============================================================================
// CONTEXT KNOWLEDGE BASE TYPES
// ============================================================================

export interface KnowledgeBaseEntry {
  id: string;
  category: string;
  question: string;
  answer: string;
  event_types?: EventType[];
  keywords: string[];
}

export interface PricingInfo {
  event_type: EventType;
  packages: Array<{
    name: string;
    price_range?: string;
    features: string[];
  }>;
}

export interface ServiceArea {
  location: string;
  travel_fee?: string;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export class ChatError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'ChatError';
  }
}

export class NetworkError extends ChatError {
  constructor(message: string = 'Network error occurred') {
    super(message, 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
}

export class ValidationError extends ChatError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
  }
}

// ============================================================================
// WEBHOOK ENDPOINT CONFIGS
// ============================================================================

export const N8N_WEBHOOK_ENDPOINTS = {
  LEAD_CAPTURE: '/webhook/colorme-lead-capture',
  CHATBOT: '/webhook/colorme-chatbot',
  AVAILABILITY_CHECK: '/webhook/colorme-availability',
} as const;

// ============================================================================
// COLOR ME BOOTH KNOWLEDGE BASE
// ============================================================================

export const COLORME_KNOWLEDGE_BASE: KnowledgeBaseEntry[] = [
  // PRICING
  {
    id: 'pricing-general',
    category: 'pricing',
    question: 'How much does ColorMe Booth cost?',
    answer: 'Our pricing varies by event type and package. We offer two main packages: the Sketch Pass (starter package) and the Masterpiece Bundle (premium package). Please fill out the contact form with your event details for a customized quote.',
    keywords: ['price', 'cost', 'rate', 'how much', 'pricing', 'affordable'],
  },
  {
    id: 'pricing-kiddie',
    category: 'pricing',
    question: 'How much for kiddie parties?',
    answer: 'For kiddie parties, we offer the Sketch Pass starter package and the Masterpiece Bundle which includes premium 8-color crayon sets for every guest. Contact us for specific pricing based on your party size and duration.',
    event_types: ['kiddie_party'],
    keywords: ['kiddie', 'birthday', 'kids', 'children', 'price', 'cost'],
  },
  {
    id: 'pricing-wedding',
    category: 'pricing',
    question: 'How much for weddings?',
    answer: 'Wedding packages include the Reception Essentials (4 hours) and the Grand Wedding Bundle (5 hours) with premium gold-crayon sets for every guest. Let us know your wedding date for a detailed quote.',
    event_types: ['wedding'],
    keywords: ['wedding', 'bride', 'groom', 'marriage', 'price', 'cost'],
  },
  {
    id: 'pricing-debut',
    category: 'pricing',
    question: 'How much for debuts?',
    answer: 'Debut packages include the Rose Garden Package and the Grand Debut Bundle with rose gold crayon sets. Perfect for 18th birthdays! Share your debut date for a custom quote.',
    event_types: ['debut'],
    keywords: ['debut', '18th birthday', 'eighteenth', 'quinceanera', 'price', 'cost'],
  },
  {
    id: 'pricing-corporate',
    category: 'pricing',
    question: 'How much for corporate events?',
    answer: 'Corporate packages include Team Building Essentials and the Premium Brand Bundle with full customization. We offer special corporate rates. Tell us about your event size and requirements.',
    event_types: ['corporate'],
    keywords: ['corporate', 'company', 'team building', 'office', 'business', 'price', 'cost'],
  },

  // SERVICE AREAS
  {
    id: 'service-area',
    category: 'location',
    question: 'Where do you serve?',
    answer: 'We primarily serve Metro Manila including Makati, BGC, Taguig, Quezon City, Alabang, and surrounding areas. We also travel to Tagaytay, Cavite, and other locations for an additional travel fee.',
    keywords: ['location', 'area', 'where', 'serve', 'travel', 'metro manila'],
  },

  // HOW IT WORKS
  {
    id: 'how-it-works',
    category: 'process',
    question: 'How does ColorMe Booth work?',
    answer: 'It\'s simple! 1) SNAP - Our roamer finds your guests with no lines. 2) SKETCH - AI instantly converts photos into beautiful line art. 3) STYLE - Guests color their custom pages with premium crayons.',
    keywords: ['how', 'work', 'process', 'what is', 'explain'],
  },

  // PACKAGES
  {
    id: 'packages',
    category: 'packages',
    question: 'What packages do you offer?',
    answer: 'We offer two main packages: 1) Sketch Pass - Includes roamer service, unlimited prints, and communal coloring station. 2) Masterpiece Bundle - Adds premium crayon sets for every guest, custom branding, and digital gallery with highlights reel.',
    keywords: ['package', 'bundle', 'what include', 'included', 'features'],
  },

  // BOOKING
  {
    id: 'booking',
    category: 'booking',
    question: 'How do I book ColorMe Booth?',
    answer: 'To check availability and book, please fill out the contact form with your event date, venue, and details. We\'ll get back to you within 24-48 hours with availability and a customized quote.',
    keywords: ['book', 'reserve', 'schedule', 'availability', 'how to book'],
  },

  // DURATION
  {
    id: 'duration',
    category: 'service',
    question: 'How long is the service?',
    answer: 'Our standard packages are 3-5 hours depending on the event type. Extensions are available at ₱2,000-₱3,000 per hour depending on your event type.',
    keywords: ['long', 'duration', 'hours', 'time', 'how long'],
  },

  // CRAYONS/KEEPSAKES
  {
    id: 'crayons',
    category: 'features',
    question: 'Do you provide crayons?',
    answer: 'Yes! Our Masterpiece Bundle includes premium crayon sets for every guest. We offer standard 8-color sets, gold sets for weddings, and rose gold sets for debuts. Corporate events can be fully branded.',
    keywords: ['crayon', 'coloring', 'supplies', 'materials', 'keepsake'],
  },

  // BRANDING
  {
    id: 'branding',
    category: 'features',
    question: 'Can you customize with my logo/theme?',
    answer: 'Yes! We can add custom borders, event logos, names, and dates to every print. Corporate events get full brand customization with logos and company colors.',
    keywords: ['logo', 'brand', 'customize', 'personalized', 'theme', 'design'],
  },

  // CAPACITY
  {
    id: 'capacity',
    category: 'service',
    question: 'How many guests can you accommodate?',
    answer: 'Our roamer service can handle unlimited guests! There are no lines - we move around your event finding guests. The more guests, the more memories created!',
    keywords: ['capacity', 'guests', 'people', 'many', 'limit', 'maximum'],
  },

  // SETUP REQUIREMENTS
  {
    id: 'setup',
    category: 'logistics',
    question: 'What do you need for setup?',
    answer: 'We need a table space for the coloring station (about 6ft table preferred). Our roamer is wireless and mobile, so we can move around your venue freely!',
    keywords: ['setup', 'requirement', 'space', 'table', 'power', 'equipment'],
  },

  // PAYMENT
  {
    id: 'payment',
    category: 'booking',
    question: 'What are your payment terms?',
    answer: 'We require a 50% deposit to reserve your date, with the remaining 50% due on the day of the event. We accept bank transfer, GCash, and credit cards.',
    keywords: ['payment', 'deposit', 'pay', 'terms', 'balance', 'gcash'],
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getKnowledgeBaseAnswer(
  query: string,
  eventType?: EventType
): KnowledgeBaseEntry | null {
  const lowerQuery = query.toLowerCase();

  // Score each entry based on keyword matches
  const scoredEntries = COLORME_KNOWLEDGE_BASE.map((entry) => {
    let score = 0;

    // Check if entry is relevant to the event type
    if (eventType && entry.event_types) {
      if (entry.event_types.includes(eventType)) {
        score += 10;
      }
    }

    // Check keyword matches
    entry.keywords.forEach((keyword) => {
      if (lowerQuery.includes(keyword.toLowerCase())) {
        score += 5;
      }
    });

    // Check question similarity
    const lowerQuestion = entry.question.toLowerCase();
    const queryWords = lowerQuery.split(' ').filter((w) => w.length > 3);
    queryWords.forEach((word) => {
      if (lowerQuestion.includes(word)) {
        score += 2;
      }
    });

    return { entry, score };
  });

  // Sort by score and return the best match
  scoredEntries.sort((a, b) => b.score - a.score);

  const bestMatch = scoredEntries[0];
  if (bestMatch && bestMatch.score > 5) {
    return bestMatch.entry;
  }

  return null;
}

export function isValidEventType(type: string): type is EventType {
  return ['kiddie_party', 'wedding', 'debut', 'corporate'].includes(type);
}

export function isValidLeadSource(source: string): source is LeadSource {
  return ['contact_form', 'chatbot', 'book_now'].includes(source);
}
