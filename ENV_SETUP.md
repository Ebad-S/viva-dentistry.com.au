# Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

## Required Environment Variables

```env
# ===================================
# Email Configuration (Resend)
# ===================================
# Get your API key from: https://resend.com/api-keys
RESEND_API_KEY=re_your_actual_resend_api_key_here

# ===================================
# reCAPTCHA Enterprise Configuration
# ===================================
# Get your keys from Google Cloud Console

# Your site key from Google Cloud Console (visible in browser):
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Ld7QuIrAAAAAEnyHRE0NqBcjOWKl8dWFvA6ezpS

# Your secret key (server-side only, never expose to client)
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here

# Google Cloud Project ID (e.g., viva-dentistry-12345)
RECAPTCHA_PROJECT_ID=your_google_cloud_project_id

# Google Cloud API Key for reCAPTCHA Enterprise API
RECAPTCHA_API_KEY=your_google_cloud_api_key
```

## How to Get Your Keys

### 1. Resend API Key
1. Go to [Resend Dashboard](https://resend.com/api-keys)
2. Create a new API key
3. Copy and paste it as `RESEND_API_KEY`

### 2. reCAPTCHA Enterprise Keys
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **reCAPTCHA Enterprise**
3. Copy your **Site Key** → Use as `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
4. Copy your **Secret Key** → Use as `RECAPTCHA_SECRET_KEY`
5. Note your **Project ID** from the top of the page → Use as `RECAPTCHA_PROJECT_ID`
6. Go to **APIs & Services** → **Credentials** → Create API Key → Use as `RECAPTCHA_API_KEY`

## Important Notes

- **Development Mode**: reCAPTCHA Enterprise is automatically disabled in development to avoid domain errors
- **Production Mode**: All reCAPTCHA checks are fully enabled
- **Email Recipient**: Contact form sends emails to `contact@viva-dentistry.com.au`
- **Domain Verification**: Make sure to verify `viva-dentistry.com.au` in your Resend dashboard

## Testing

### Development (localhost)
```bash
npm run dev
```
- reCAPTCHA Enterprise: ❌ Disabled (no domain errors)
- Form submission: ✅ Works
- Email sending: ✅ Works (if RESEND_API_KEY is set)

### Production
```bash
npm run build
npm start
```
- reCAPTCHA Enterprise: ✅ Enabled (full protection)
- Form submission: ✅ Protected by reCAPTCHA
- Email sending: ✅ Verified domain required

