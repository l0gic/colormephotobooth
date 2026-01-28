'use client';

import { useState } from 'react';
import { Sparkles, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { submitContactFormLead, extractEventTypeFromPath } from '@/lib/n8nClient';
import type { EventType } from '@/lib/chatTypes';

// Form state interface
interface FormData {
  name: string;
  email: string;
  venue: string;
  message: string;
}

// ContactForm props
interface ContactFormProps {
  eventType?: EventType;
  formTitle?: string;
  formDescription?: string;
}

// Form errors interface
interface FormErrors {
  name?: string;
  email?: string;
  venue?: string;
  message?: string;
}

// Submission result state type
type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm({
  eventType: propEventType,
  formTitle,
  formDescription,
}: ContactFormProps) {
  // Determine event type from prop or URL
  const eventType = propEventType || extractEventTypeFromPath();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    venue: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.venue.trim()) {
      newErrors.venue = 'Event date and venue information is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please tell us about your event';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      venue: '',
      message: '',
    });
    setErrors({});
  };

  const openMailtoFallback = () => {
    // Email fallback removed to prevent spam scraping
    // The form submits via N8N webhook; if that fails, user sees error modal
    console.warn('Form submission failed. N8N webhook unavailable and email fallback disabled.');
  };

  const submitToN8N = async (): Promise<boolean> => {
    // Check webhook URL is configured
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_LEAD_WEBHOOK_URL
      || process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn('N8N webhook URL not configured, falling back to mailto');
      return false;
    }

    try {
      // Get current page URL
      const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

      // Use the n8nClient helper
      await submitContactFormLead(
        {
          name: formData.name,
          email: formData.email,
          venue: formData.venue,
          message: formData.message,
        },
        eventType,
        pageUrl
      );

      return true;
    } catch (error) {
      console.error('Error submitting to N8N:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setSubmissionState('submitting');
    setErrorMessage('');

    try {
      const success = await submitToN8N();

      if (success) {
        setSubmissionState('success');
        resetForm();
      } else {
        // Webhook not configured, fall back to mailto
        openMailtoFallback();
        setSubmissionState('idle');
      }
    } catch (error) {
      setSubmissionState('error');
      setErrorMessage(
        'Unable to submit your request. Please try again or reach us through our social media channels.'
      );
    }
  };

  const closeSuccessModal = () => {
    setSubmissionState('idle');
  };

  const closeErrorModal = () => {
    setSubmissionState('idle');
    setErrorMessage('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Hidden tracking fields for N8N */}
        <input type="hidden" name="source" value="contact_form" />
        <input type="hidden" name="event_type" value={eventType} />
        <input
          type="hidden"
          name="page_url"
          value={typeof window !== 'undefined' ? window.location.href : ''}
        />
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-6 py-4 rounded-2xl border-2 focus:ring-4 outline-none transition bg-white placeholder-gray-500 ${
                errors.name
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                  : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100'
              }`}
              required
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <span id="name-error" className="absolute -bottom-5 left-2 text-xs text-red-500">
                {errors.name}
              </span>
            )}
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-6 py-4 rounded-2xl border-2 focus:ring-4 outline-none transition bg-white placeholder-gray-500 ${
                errors.email
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                  : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100'
              }`}
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" className="absolute -bottom-5 left-2 text-xs text-red-500">
                {errors.email}
              </span>
            )}
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            name="venue"
            placeholder="Event Date & Venue (e.g. Shangri-La at the Fort)"
            value={formData.venue}
            onChange={handleChange}
            className={`w-full px-6 py-4 rounded-2xl border-2 focus:ring-4 outline-none transition bg-white placeholder-gray-500 ${
              errors.venue
                ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100'
            }`}
            required
            aria-invalid={!!errors.venue}
            aria-describedby={errors.venue ? 'venue-error' : undefined}
          />
          {errors.venue && (
            <span id="venue-error" className="absolute -bottom-5 left-2 text-xs text-red-500">
              {errors.venue}
            </span>
          )}
        </div>

        <div className="relative">
          <textarea
            name="message"
            placeholder="Tell us about your event theme..."
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-6 py-4 rounded-2xl border-2 focus:ring-4 outline-none transition bg-white resize-none placeholder-gray-500 ${
              errors.message
                ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100'
            }`}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <span id="message-error" className="absolute -bottom-5 left-2 text-xs text-red-500">
              {errors.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={submissionState === 'submitting'}
          className="w-full bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white py-5 rounded-2xl font-bold shadow-xl shadow-indigo-200 btn-playful flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submissionState === 'submitting' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Request a Quotation
            </>
          )}
        </button>
      </form>

      {/* Loading Overlay */}
      {submissionState === 'submitting' && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="loading-title"
        >
          <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-4 max-w-sm mx-4">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            <p id="loading-title" className="text-lg font-semibold text-gray-800">
              Sending your request...
            </p>
            <p className="text-gray-500 text-center text-sm">
              Please wait while we process your quotation request.
            </p>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {submissionState === 'success' && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
        >
          <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-4 max-w-sm mx-4 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 id="success-title" className="text-xl font-bold text-gray-800 text-center">
              Request Received!
            </h2>
            <p className="text-gray-600 text-center">
              Thank you for your interest in Color Me Booth. We&apos;ve received your quotation
              request and will get back to you within 24-48 hours.
            </p>
            <button
              type="button"
              onClick={closeSuccessModal}
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold shadow-lg btn-playful"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {submissionState === 'error' && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="error-title"
        >
          <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-4 max-w-sm mx-4 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h2 id="error-title" className="text-xl font-bold text-gray-800 text-center">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 text-center text-sm">{errorMessage}</p>
            <button
              type="button"
              onClick={closeErrorModal}
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold shadow-lg btn-playful"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </>
  );
}
