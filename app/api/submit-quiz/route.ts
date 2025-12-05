import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.fullName || !data.phone || !data.email) {
      return NextResponse.json(
        { success: false, error: 'Missing required contact information' },
        { status: 400 }
      );
    }

    // Format the assessment data for storage/email
    const assessmentData = {
      timestamp: new Date().toISOString(),
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      seekingHelpFor: data.seekingHelpFor,
      primaryCondition: data.primaryCondition,
      duration: data.duration,
      severity: data.severity,
      previousTreatment: data.previousTreatment,
      mentalHealthConcerns: Array.isArray(data.mentalHealthConcerns) ? data.mentalHealthConcerns.join(', ') : '',
      insuranceType: data.insuranceType,
      insuranceProvider: data.insuranceProvider,
      insuranceReceivedHow: data.insuranceReceivedHow,
      recoveryReadiness: data.recoveryReadiness,
      timeframe: data.timeframe,
      consentToContact: data.consentToContact ? 'Yes' : 'No',
    };

    // Option 1: If using Google Sheets integration
    console.log('Checking Sheets env vars...');
    console.log('GOOGLE_REFRESH_TOKEN:', process.env.GOOGLE_REFRESH_TOKEN ? '***set***' : '***NOT SET***');
    console.log('GOOGLE_SHEET_ID:', process.env.GOOGLE_SHEET_ID ? '***set***' : '***NOT SET***');

    if (process.env.GOOGLE_REFRESH_TOKEN && process.env.GOOGLE_SHEET_ID) {
      console.log('Submitting to Google Sheets...');
      try {
        await submitToGoogleSheets(assessmentData, data.insuranceCardImage);
        console.log('Google Sheets submission completed successfully');
      } catch (error) {
        console.error('Google Sheets submission failed:', error);
        // Return error instead of silently failing
        return NextResponse.json(
          { success: false, error: 'Google Sheets submission failed', details: error instanceof Error ? error.message : String(error) },
          { status: 500 }
        );
      }
    } else {
      console.log('Sheets env vars not set, skipping Sheets submission');
    }

    // Option 2: If using email integration (basic fallback)
    if (process.env.QUIZ_EMAIL) {
      try {
        await submitViaEmail(assessmentData);
      } catch (error) {
        console.error('Email submission failed:', error);
      }
    }

    // Option 3: Always log to console (development backup)
    console.log('Quiz submission received and logged:', assessmentData);
    return NextResponse.json(
      { success: true, message: 'Assessment saved successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing quiz submission:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process assessment' },
      { status: 500 }
    );
  }
}

async function submitToGoogleSheets(
  assessmentData: Record<string, any>,
  insuranceCardImage: string | null
): Promise<void> {
  try {
    // Get access token
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!refreshToken || !clientId || !clientSecret) {
      throw new Error('Google OAuth credentials not configured');
    }

    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }).toString(),
    });

    if (!tokenResponse.ok) {
      throw new Error(`Failed to refresh token: ${await tokenResponse.text()}`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Upload insurance card image if provided
    let insuranceCardLink = '';
    if (insuranceCardImage && process.env.GOOGLE_DRIVE_FOLDER_ID) {
      console.log('Uploading insurance card image to Google Drive...');
      insuranceCardLink = await uploadImageToDrive(
        insuranceCardImage,
        `insurance-card-${assessmentData.email}-${Date.now()}.jpg`,
        accessToken,
        process.env.GOOGLE_DRIVE_FOLDER_ID
      );
      console.log('Insurance card upload result:', insuranceCardLink);
    } else {
      console.log('No image or Drive folder ID provided. Image provided:', !!insuranceCardImage, 'Folder ID:', !!process.env.GOOGLE_DRIVE_FOLDER_ID);
    }

    // Prepare row for Google Sheets
    const row = [
      assessmentData.timestamp,
      assessmentData.seekingHelpFor,
      assessmentData.primaryCondition,
      assessmentData.duration,
      assessmentData.severity,
      assessmentData.previousTreatment,
      assessmentData.mentalHealthConcerns,
      assessmentData.insuranceType,
      assessmentData.insuranceProvider,
      insuranceCardLink || 'No image',
      assessmentData.insuranceReceivedHow,
      assessmentData.recoveryReadiness,
      assessmentData.dateOfBirth,
      assessmentData.timeframe,
      assessmentData.fullName,
      assessmentData.phone,
      assessmentData.email,
      assessmentData.consentToContact,
    ];

    // Append to Google Sheets
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    console.log('Attempting to append to Google Sheets...');
    console.log('Spreadsheet ID:', spreadsheetId);
    console.log('Access token:', accessToken ? 'present' : 'missing');

    // Use 'leads' sheet - this is the standard name
    const sheetName = 'leads';

    // Use the values:append endpoint
    // For sheets with spaces in the name, they need to be quoted
    const encodedSheetName = sheetName.includes(' ') ? `'${sheetName}'` : sheetName;
    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodedSheetName}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
    console.log('Request URL:', sheetsUrl);

    console.log('Sending to Sheets URL:', sheetsUrl);
    console.log('Row data to append:', JSON.stringify(row));

    const sheetsResponse = await fetch(sheetsUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [row],
      }),
    });

    console.log('Google Sheets response status:', sheetsResponse.status);
    const sheetsText = await sheetsResponse.text();
    console.log('Google Sheets response body:', sheetsText);

    if (!sheetsResponse.ok) {
      console.error('Google Sheets API error response:', sheetsText);
      console.error('Status code:', sheetsResponse.status);
      console.error('Sheet ID being used:', spreadsheetId);
      console.error('Sheet name being used:', sheetName);
      throw new Error(`Google Sheets API error: ${sheetsResponse.status} - ${sheetsText}`);
    } else {
      console.log('Successfully appended to Google Sheets');
    }

  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    throw error;
  }
}

async function uploadImageToDrive(
  base64Image: string,
  fileName: string,
  accessToken: string,
  folderId: string
): Promise<string> {
  try {
    console.log('uploadImageToDrive called with fileName:', fileName);
    const base64Data = base64Image.split(',')[1];
    const binaryData = Buffer.from(base64Data, 'base64');
    console.log('Base64 data length:', base64Data?.length, 'Binary data length:', binaryData.length);

    const metadata = {
      name: fileName,
      parents: [folderId],
      mimeType: 'image/jpeg',
    };

    const boundary = '===============7330845974216740156==';
    const metadataStr = JSON.stringify(metadata);

    const part1 = Buffer.from(
      `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metadataStr}\r\n--${boundary}\r\nContent-Type: image/jpeg\r\n\r\n`
    );
    const part2 = Buffer.from('\r\n--' + boundary + '--');
    const body = Buffer.concat([part1, binaryData, part2]);

    console.log('Sending request to Google Drive API...');
    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': `multipart/related; boundary="${boundary}"`,
      },
      body: body,
    });

    console.log('Google Drive upload response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Drive upload error:', errorText);
      return '';
    }

    const fileData = await response.json();
    const fileId = fileData.id;
    console.log('Successfully uploaded file to Google Drive. File ID:', fileId);

    // Make file publicly accessible
    console.log('Making file publicly accessible...');
    const permResponse = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role: 'reader',
        type: 'anyone',
      }),
    });
    console.log('Permission update response status:', permResponse.status);

    const viewUrl = `https://drive.google.com/uc?id=${fileId}&export=view`;
    console.log('Image URL:', viewUrl);
    return viewUrl;
  } catch (error) {
    console.error('Error uploading image to Drive:', error);
    return '';
  }
}

async function submitViaEmail(assessmentData: Record<string, any>): Promise<void> {
  try {
    // This is a placeholder for email submission
    // In a real implementation, you would use a service like SendGrid, Nodemailer, or AWS SES
    console.log('Quiz submission via email:', assessmentData);
  } catch (error) {
    console.error('Error submitting via email:', error);
    throw error;
  }
}
