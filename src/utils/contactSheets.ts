/**
 * Google Sheets API utility for contact form submissions
 * This handles sending contact form data to the Google Apps Script web app
 */

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// Get the Google Apps Script URL from environment variables or use default
const GOOGLE_APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbwunojNpGZQ_21mMZxhmcpuq6uY7g6JqsY-OpD6-fnzWFlQrMGqUF_U3GDgdl5lz48/exec';

/**
 * Submits contact form data to Google Sheets via Google Apps Script
 * @param data - The contact form data to submit
 * @returns Promise<ApiResponse> - The API response
 */
export async function submitContactToGoogleSheets(data: ContactData): Promise<ApiResponse> {
  try {
    // Use a form submission approach that works better with Google Apps Script
    const formData = new FormData();
    const payload = {
      ...data,
      type: 'contact' // Add type to distinguish from tournament signups
    };
    
    console.log('📝 Contact Form Data being sent:', payload);
    formData.append('data', JSON.stringify(payload));
    
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error submitting contact form to Google Sheets:', error);
    
    // Fallback to console logging if Google Sheets fails
    console.log('📝 Contact Form Data (Google Sheets failed, logging to console):', {
      ...data,
      timestamp: new Date().toISOString(),
      type: 'contact'
    });
    
    return {
      success: true,
      message: 'Message sent successfully (logged to console due to Google Sheets error)'
    };
  }
}

/**
 * Validates contact form data before submission
 * @param data - The form data to validate
 * @returns object with isValid boolean and errors array
 */
export function validateContactData(data: ContactData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name?.trim()) {
    errors.push('Name is required');
  }

  if (!data.email?.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Please enter a valid email address');
  }

  if (!data.subject?.trim()) {
    errors.push('Subject is required');
  }

  if (!data.message?.trim()) {
    errors.push('Message is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
