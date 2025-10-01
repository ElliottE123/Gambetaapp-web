/**
 * Google Apps Script for Gambeta Tournament Signups
 * This script handles form submissions and stores them in a Google Sheet
 * 
 * Setup Instructions:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Replace the default code with this script
 * 4. Create a new Google Sheet and note its ID
 * 5. Update the SPREADSHEET_ID constant below
 * 6. Deploy as a web app with execute permissions for "Anyone"
 * 7. Copy the web app URL for use in your React app
 */

// Replace this with your actual Google Sheet ID
const SPREADSHEET_ID = '1nGjzqtiln8jSYWPGhBVYOvJuTAUHMkrj6qbhWcfmHjQ';

// Sheet names where data will be stored
const TOURNAMENT_SHEET_NAME = 'Tournament Signups';
const CONTACT_SHEET_NAME = 'Contact Form Submissions';

// Headers for the sheets
const TOURNAMENT_HEADERS = ['Timestamp', 'Name', 'Age', 'Email', 'Platform', 'IP Address'];
const CONTACT_HEADERS = ['Timestamp', 'Name', 'Email', 'Subject', 'Message', 'IP Address'];

function doPost(e) {
  try {
    // Parse the incoming data - handle both JSON and form data
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter && e.parameter.data) {
      data = JSON.parse(e.parameter.data);
    } else {
      throw new Error('No data received');
    }
    
    // Determine the type of submission and validate accordingly
    const isContactForm = data.type === 'contact';
    
    if (isContactForm) {
      // Validate contact form fields
      if (!data.name || !data.email || !data.subject || !data.message) {
        return ContentService
          .createTextOutput(JSON.stringify({
            success: false,
            error: 'Missing required contact form fields'
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      
      // Get or create the contact sheet
      const sheet = getOrCreateContactSheet();
      
      // Prepare the contact row data
      const timestamp = new Date().toISOString();
      const ipAddress = e.parameter.ip || 'Unknown';
      
      const rowData = [
        timestamp,
        data.name,
        data.email,
        data.subject,
        data.message,
        ipAddress
      ];
      
      // Append the data to the contact sheet
      sheet.appendRow(rowData);
      
    } else {
      // Validate tournament signup fields
      if (!data.name || !data.email || !data.age || !data.platform) {
        return ContentService
          .createTextOutput(JSON.stringify({
            success: false,
            error: 'Missing required tournament signup fields'
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      
      // Get or create the tournament sheet
      const sheet = getOrCreateTournamentSheet();
      
      // Prepare the tournament row data
      const timestamp = new Date().toISOString();
      const ipAddress = e.parameter.ip || 'Unknown';
      
      const rowData = [
        timestamp,
        data.name,
        data.age,
        data.email,
        data.platform,
        ipAddress
      ];
      
      // Append the data to the tournament sheet
      sheet.appendRow(rowData);
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Signup recorded successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (for testing)
  return ContentService
    .createTextOutput(JSON.stringify({
      message: 'Gambeta Tournament Signup API is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateTournamentSheet() {
  try {
    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Try to get the sheet
    let sheet = spreadsheet.getSheetByName(TOURNAMENT_SHEET_NAME);
    
    if (!sheet) {
      // Create the sheet if it doesn't exist
      sheet = spreadsheet.insertSheet(TOURNAMENT_SHEET_NAME);
      
      // Add headers
      sheet.getRange(1, 1, 1, TOURNAMENT_HEADERS.length).setValues([TOURNAMENT_HEADERS]);
      
      // Format the header row
      const headerRange = sheet.getRange(1, 1, 1, TOURNAMENT_HEADERS.length);
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('white');
      headerRange.setFontWeight('bold');
      
      // Auto-resize columns
      sheet.autoResizeColumns(1, TOURNAMENT_HEADERS.length);
    }
    
    return sheet;
  } catch (error) {
    throw new Error('Failed to access Google Sheet: ' + error.toString());
  }
}

function getOrCreateContactSheet() {
  try {
    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Try to get the sheet
    let sheet = spreadsheet.getSheetByName(CONTACT_SHEET_NAME);
    
    if (!sheet) {
      // Create the sheet if it doesn't exist
      sheet = spreadsheet.insertSheet(CONTACT_SHEET_NAME);
      
      // Add headers
      sheet.getRange(1, 1, 1, CONTACT_HEADERS.length).setValues([CONTACT_HEADERS]);
      
      // Format the header row
      const headerRange = sheet.getRange(1, 1, 1, CONTACT_HEADERS.length);
      headerRange.setBackground('#34a853'); // Green color for contact form
      headerRange.setFontColor('white');
      headerRange.setFontWeight('bold');
      
      // Auto-resize columns
      sheet.autoResizeColumns(1, CONTACT_HEADERS.length);
    }
    
    return sheet;
  } catch (error) {
    throw new Error('Failed to access Google Sheet: ' + error.toString());
  }
}

// Test function to verify setup
function testSetup() {
  try {
    const tournamentSheet = getOrCreateTournamentSheet();
    const contactSheet = getOrCreateContactSheet();
    console.log('Setup test successful! Tournament sheet has', tournamentSheet.getLastRow(), 'rows');
    console.log('Contact sheet has', contactSheet.getLastRow(), 'rows');
    return true;
  } catch (error) {
    console.error('Setup test failed:', error);
    return false;
  }
}
