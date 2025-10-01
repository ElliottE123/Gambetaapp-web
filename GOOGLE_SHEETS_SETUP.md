# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for the tournament signup form.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Gambeta Tournament Signups" (or any name you prefer)
4. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/1ABC123...XYZ789/edit`
   - Sheet ID: `1ABC123...XYZ789`

## Step 2: Set up Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the content from `google-apps-script.js`
4. Update the `SPREADSHEET_ID` constant with your Sheet ID from Step 1
5. Save the project (Ctrl+S or Cmd+S)
6. Name your project "Gambeta Signup Handler"

## Step 3: Deploy the Web App

1. In your Google Apps Script project, click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set the following options:
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click "Deploy"
5. Copy the Web App URL (you'll need this for the next step)

## Step 4: Update Your React App

1. Open `src/utils/googleSheets.ts`
2. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your Web App URL from Step 3
3. Save the file

## Step 5: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the tournament page
3. Click "Get Notified" or "Sign Up for Early Access"
4. Fill out the form and submit
5. Check your Google Sheet - you should see the data appear in a new row

## Data Structure

The Google Sheet will have the following columns:
- **Timestamp**: When the signup was submitted
- **Name**: User's full name
- **Age**: User's age
- **Email**: User's email address
- **Platform**: Preferred platform (iOS/Android/Both)
- **IP Address**: User's IP address (for analytics)

## Troubleshooting

### Common Issues:

1. **"Script not found" error**: Make sure you deployed the web app correctly and copied the right URL
2. **"Permission denied" error**: Ensure the web app is set to "Anyone" access
3. **Data not appearing**: Check that the Sheet ID is correct in the Apps Script code
4. **CORS errors**: Make sure you're using the correct web app URL (not the script editor URL)

### Testing the Apps Script:

1. In your Apps Script project, click "Run" next to the `testSetup` function
2. Check the execution log for any errors
3. If successful, you should see "Setup test successful!" in the logs

## Security Notes

- The web app is set to "Anyone" access, which means it can be called from any website
- Consider adding additional validation or rate limiting if needed
- The IP address is collected for basic analytics but not stored permanently
- All form data is stored in your Google Sheet, which you control

## Next Steps

Once everything is working:
1. You can view signups in real-time in your Google Sheet
2. Consider setting up email notifications for new signups
3. You can export the data to CSV or other formats as needed
4. Add additional columns to the sheet if you want to track more information

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify all URLs and IDs are correct
3. Test the Apps Script function directly
4. Ensure your Google account has the necessary permissions
