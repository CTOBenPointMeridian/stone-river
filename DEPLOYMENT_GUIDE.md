# Stone River Behavioral Health - Development & Deployment Guide

## Project Overview
Next.js website for Stone River Behavioral Health with React, Tailwind CSS, and Framer Motion animations. Includes comprehensive mental health assessment quiz with Google Sheets and Google Drive integration for insurance card uploads.

## Local Development

### Starting the Dev Server
```bash
npm run dev
```
The dev server will attempt to run on port 3000, but will use 3001 if 3000 is occupied.

### Common Issues
- **Lock file error**: If you see "Unable to acquire lock at .next/dev/lock", remove the `.next/dev` directory:
  ```bash
  rm -rf .next/dev
  ```

## Vercel Deployment

### Important Note
**GitHub pushes DO NOT automatically trigger Vercel deployments** for this project. You must manually trigger deployments after pushing to GitHub.

### Environment Variables
The following environment variables must be set in your `.env.local` file (do not commit):

```
# Google OAuth Configuration (from Google Cloud Console)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REFRESH_TOKEN=your_google_refresh_token_here

# Google Sheet & Drive IDs
GOOGLE_SHEET_ID=your_google_sheet_id_here
GOOGLE_DRIVE_FOLDER_ID=your_google_drive_folder_id_here

# Vercel Deployment (optional, for manual API deployments)
VERCEL_TOKEN=your_vercel_token_here
```

**IMPORTANT**: Never commit `.env.local` to GitHub. Store credentials securely in Vercel's environment variable dashboard.

### Deployment Process

1. **Make your code changes and commit**:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Deploy via Vercel Dashboard** (Recommended):
   - Go to https://vercel.com/bencastro/stone-river-behavioral-health
   - Click "Deploy" or re-deploy from Git
   - Vercel will automatically build and deploy from the latest push

3. **Alternative: Trigger via API**:
   ```bash
   curl -X POST "https://api.vercel.com/v13/deployments?skipAutoDetectionConfirmation=1" \
     -H "Authorization: Bearer YOUR_VERCEL_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "stone-river-behavioral-health",
       "target": "production",
       "gitSource": {
         "type": "github",
         "org": "bencastro",
         "repo": "Stone-river",
         "ref": "main"
       },
       "projectSettings": {
         "framework": "nextjs",
         "buildCommand": "next build",
         "installCommand": "npm install",
         "outputDirectory": null,
         "devCommand": "next dev --port $PORT"
       }
     }'
   ```

4. **Monitor deployment status**:
   - Watch the Vercel dashboard for real-time deployment status
   - Check for `READY` status before considering deployment complete

### Deployment Success Indicators
In the Vercel dashboard, look for:
- ✅ Build completed successfully
- ✅ Status shows "READY" (green)
- ✅ Production URL is live

### Vercel Project Details
- **Project Name**: stone-river-behavioral-health
- **Project URL**: https://vercel.com/bencastro/stone-river-behavioral-health
- **Repository**: bencastro/Stone-river
- **Git Branch**: main
- **Production Domain**: [Your production domain from Vercel]

### Deploying Environment Variables to Vercel
1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add each environment variable:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `GOOGLE_REFRESH_TOKEN`
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_DRIVE_FOLDER_ID`
4. Select which environments (Production, Preview, Development)
5. Click "Save"

### Common Deployment Issues

1. **Build Fails with TypeScript Errors**:
   - Test locally first: `npm run build`
   - Fix any TypeScript errors before pushing to GitHub
   - Check that all imports are correct

2. **Environment Variables Not Found**:
   - Verify variables are set in Vercel dashboard
   - Ensure variable names match exactly (case-sensitive)
   - Redeploy after adding new environment variables

3. **Google Sheets/Drive Integration Not Working**:
   - Verify OAuth credentials are current
   - Check that Google APIs are enabled in Cloud Console
   - Confirm service account has access to Sheet and Drive folder
   - Check Vercel logs for specific error messages

4. **Old Commit Being Deployed**:
   - Ensure your local main matches remote:
     ```bash
     git log --oneline -5
     git log origin/main --oneline -5
     ```
   - Force a redeploy from Vercel dashboard

## Git Workflow

### Current Branch
```bash
git branch --show-current  # Should be 'main'
```

### Recent Commits
```bash
git log --oneline -10
```

### Verify Remote Sync
```bash
git status
git log origin/main --oneline -5
```

## Key Files & Components

### Styling
- [tailwind.config.ts](tailwind.config.ts) - Tailwind CSS configuration
- [app/globals.css](app/globals.css) - Global styles and CSS variables
- Color scheme: Amber/Brown (#b45309, #92400e) with white backgrounds

### API Routes
- [app/api/submit-quiz/route.ts](app/api/submit-quiz/route.ts) - Quiz submission handler with Google Sheets & Drive integration
  - Validates required fields (fullName, phone, email)
  - Refreshes OAuth token automatically
  - Uploads insurance card images to Google Drive
  - Appends quiz responses to Google Sheets

### Pages
- [app/page.tsx](app/page.tsx) - Main landing page with all sections
- [app/quiz/page.tsx](app/quiz/page.tsx) - 17-step mental health assessment quiz

### Components
- [components/Header.tsx](components/Header.tsx) - Fixed navigation header with "Get Started" button linking to `/quiz`
- [components/Hero.tsx](components/Hero.tsx) - Hero section with background image and CTA
- [components/About.tsx](components/About.tsx) - About section
- [components/Services.tsx](components/Services.tsx) - Services overview
- [components/Treatment.tsx](components/Treatment.tsx) - Treatment modalities
- [components/Facilities.tsx](components/Facilities.tsx) - Facilities gallery
- [components/Housing.tsx](components/Housing.tsx) - Supportive housing information
- [components/Footer.tsx](components/Footer.tsx) - Footer with contact information

## Quiz Data Flow

1. User accesses `/quiz` via "Get Started" button in Hero or Header
2. User completes 17-step mental health assessment with sections for:
   - Who they're seeking help for
   - Primary mental health condition
   - Symptom duration and severity
   - Previous treatment history
   - Mental health concerns (multi-select)
   - Insurance information (type, provider, optional card photo)
   - Insurance coverage method
   - Recovery readiness (1-5 scale)
   - Date of birth
   - Desired timeframe for treatment
   - Contact information (name, phone, email)
   - Consent to contact

3. Form data submitted to `/api/submit-quiz`
4. API handler:
   - Validates required contact information
   - Authenticates with Google via OAuth refresh token
   - Uploads insurance card image to Google Drive (if provided)
   - Appends quiz responses to Google Sheets "leads" sheet
   - Returns success response
   - Redirects to home page after 2 seconds

5. Results saved to Google Sheets with 18 columns:
   - Timestamp, Seeking Help For, Primary Condition
   - Duration, Severity, Previous Treatment
   - Mental Health Concerns, Insurance Type, Insurance Provider
   - Insurance Card Link, Insurance Received How, Recovery Readiness
   - Date of Birth, Timeframe, Full Name, Phone, Email, Consent to Contact

### Insurance Card Upload Details
- Images are converted to base64 DataURL on the client side
- Uploaded to Google Drive folder as JPEG files
- Named: `insurance-card-{email}-{timestamp}.jpg`
- Made publicly accessible via Drive link stored in Google Sheets
- If upload fails, quiz still submits successfully (non-blocking)

## Testing Checklist Before Deployment

### Local Testing
- [ ] Local dev server runs without errors (`npm run dev`)
- [ ] No console errors or warnings
- [ ] Build completes successfully (`npm run build`)
- [ ] No TypeScript errors

### Feature Testing
- [ ] Navigation header displays correctly
- [ ] "Get Started" button in Hero navigates to `/quiz`
- [ ] Quiz loads all 17 steps
- [ ] File upload works for insurance card
- [ ] All form fields accept input
- [ ] Quiz submission completes successfully
- [ ] Redirects to home page after submission
- [ ] Data appears in Google Sheets within 30 seconds
- [ ] Insurance images upload to Google Drive folder
- [ ] Public image links work in browser

### Git & Deployment
- [ ] All changes committed to git
- [ ] Changes pushed to GitHub (main branch)
- [ ] No uncommitted changes (`git status` shows clean)
- [ ] Deployment triggered in Vercel
- [ ] Deployment status verified as READY
- [ ] No build errors in Vercel logs

### Live Site Testing
- [ ] Production URL loads correctly
- [ ] All pages and sections render
- [ ] "Get Started" button works on live site
- [ ] Quiz submission works on live site
- [ ] Data arrives in Google Sheets
- [ ] Insurance images upload successfully
- [ ] Responsive design works on mobile/tablet/desktop

## Troubleshooting

### Google Sheets Not Receiving Data
1. Verify environment variables are set in Vercel dashboard
2. Check OAuth token is valid (refresh token may expire)
3. Confirm Google Sheet ID is correct in environment variables
4. Verify sheet name is "leads" (visible in first tab at bottom)
5. Check Vercel deployment logs for error messages:
   - Look for "Successfully appended to Google Sheets" success message
   - Or error details if submission failed

### Google Drive Upload Failing
1. Verify `GOOGLE_DRIVE_FOLDER_ID` is correct
2. Check that folder is shared with the OAuth user account
3. Ensure Google Drive API is enabled in Google Cloud Console
4. Verify file size is under 25MB
5. Check Vercel logs for specific Drive API errors

### Quiz Not Loading
1. Verify all component imports are correct
2. Check that `/quiz` route exists in app directory
3. Look for JavaScript errors in browser console
4. Verify Framer Motion library is installed (`npm list framer-motion`)
5. Clear browser cache and reload

### Build Fails on Deployment
1. Run `npm run build` locally to test
2. Fix any TypeScript errors shown
3. Verify all imports reference existing files
4. Check that environment variables don't have special characters that need escaping
5. Push fixes to GitHub and redeploy

### 404 Errors on Live Site
1. Verify file paths are correct (case-sensitive)
2. Check that all pages are in the correct directory structure
3. Ensure no files were accidentally deleted
4. Clear Vercel cache and redeploy

## Performance Optimization Notes

- Images are optimized with Next.js Image component
- Framer Motion animations are GPU-accelerated
- Google Sheets API calls are cached where possible
- Base64 image conversion happens on client side to reduce server load

## Security Notes

- OAuth tokens are stored securely in Vercel environment variables
- Google refresh tokens are never exposed to client
- Insurance card images are uploaded directly to Google Drive (not stored on server)
- All API routes validate required fields
- CORS and CSP headers configured appropriately

## Contact Information

- **Phone**: (844) 524-8553
- **Service Account Email**: stoner@stone-river-behavioral-health.iam.gserviceaccount.com
- **Google Sheet**: https://docs.google.com/spreadsheets/d/1n1iE5jj6JVf9qDfkbWSdVZoRhbVeM-VzhzS6HyCWvyU/
- **Google Drive Folder**: https://drive.google.com/drive/folders/1RuZ33z-o6_77_wV1SdoThgLtHQhzpPsX

## Quick Commands Reference

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production build locally
npm start

# Run linting
npm run lint

# Check for TypeScript errors
npx tsc --noEmit

# View git status
git status

# Commit changes
git add .
git commit -m "Your message"

# Push to GitHub
git push origin main

# View deployment logs
vercel logs --tail
```

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review Vercel deployment logs
3. Verify environment variables are set correctly
4. Test locally with `npm run dev` first
5. Check Google Cloud Console for API errors
