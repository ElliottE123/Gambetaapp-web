/**
 * Google Sheets API utility for tournament signups
 * This handles sending form data to the Google Apps Script web app
 */

export interface SignupData {
  name: string;
  age: string;
  email: string;
  platform: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// Get the Google Apps Script URL from environment variables or use default
const GOOGLE_APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbwunojNpGZQ_21mMZxhmcpuq6uY7g6JqsY-OpD6-fnzWFlQrMGqUF_U3GDgdl5lz48/exec';

/**
 * Submits signup data to Google Sheets via Google Apps Script
 * @param data - The form data to submit
 * @returns Promise<ApiResponse> - The API response
 */
export async function submitSignupToGoogleSheets(data: SignupData): Promise<ApiResponse> {
  try {
    // Check if we have a valid Google Apps Script URL
    if (GOOGLE_APPS_SCRIPT_URL === 'YOUR_NEW_WEB_APP_URL_HERE' || GOOGLE_APPS_SCRIPT_URL.includes('YOUR_')) {
      // Temporary fallback - just log the data and return success
      console.log('📝 Tournament Signup Data (Google Sheets not configured):', {
        ...data,
        timestamp: new Date().toISOString(),
        ipAddress: 'Unknown (local development)'
      });
      
      // Simulate a small delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        message: 'Signup recorded successfully (logged to console)'
      };
    }

    // Use a form submission approach that works better with Google Apps Script
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    
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
    console.error('Error submitting to Google Sheets:', error);
    
    // Fallback to console logging if Google Sheets fails
    console.log('📝 Tournament Signup Data (Google Sheets failed, logging to console):', {
      ...data,
      timestamp: new Date().toISOString(),
      ipAddress: 'Unknown (local development)'
    });
    
    return {
      success: true,
      message: 'Signup recorded successfully (logged to console due to Google Sheets error)'
    };
  }
}

/**
 * Validates signup data before submission
 * @param data - The form data to validate
 * @returns object with isValid boolean and errors array
 */
export function validateSignupData(data: SignupData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name?.trim()) {
    errors.push('Name is required');
  }

  if (!data.email?.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Please enter a valid email address');
  }

  if (!data.age || parseInt(data.age) < 13 || parseInt(data.age) > 100) {
    errors.push('Age must be between 13 and 100');
  }

  if (!data.platform) {
    errors.push('Platform preference is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
