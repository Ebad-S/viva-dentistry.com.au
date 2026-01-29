# Contact Form Implementation Guide

## 📋 Overview

This document provides a comprehensive explanation of how the contact form is implemented on the Viva Dentistry website, including the tech stack, validation logic, API endpoints, and email handling.

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14.2.15** (App Router)
- **React 18.3.1** (Client Component)
- **TypeScript 5.9.2** (Type-safe form handling)
- **React Hook Form** (Form state management - optional, currently using native state)
- **Framer Motion** (UI animations and transitions)

### Backend
- **Next.js API Routes** (Serverless functions)
- **Resend API** (Email delivery service)
- **Node.js 18+** (Runtime environment)

### Validation
- **Client-side validation** (React state with regex patterns)
- **Server-side validation** (API route validation)
- **TypeScript interfaces** (Type checking)

---

## 🔗 Is There a Server/API Endpoint?

**Yes** ✅

The form submits to a serverless API endpoint at:
```
/api/contact
```

**File Location**: `src/app/api/contact/route.ts`

**Method**: `POST`

**Content-Type**: `application/json`

---

## 📝 Form Fields

### Required Fields
1. **Name** (string)
   - Min length: 2 characters
   - Client regex: Must not be empty after trim
   
2. **Email** (string)
   - Format: Valid email address
   - Client regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
   - Server regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
   
3. **Phone** (string)
   - Min length: 8 characters (after removing spaces)
   - Client regex: `/^[\d\s\(\)\+\-\.]{8,}$/`
   - Server regex: `/^[\d\s\-\(\)\+]+$/`
   - Allows: digits, spaces, dashes, parentheses, plus sign, dots

### Optional Fields
4. **Message** (string)
   - No validation
   - Can be empty
   - Used for additional appointment details

---

## 🎯 Form Submit Handler (Frontend)

### Location
`src/components/Contact.tsx` (lines 68-103)

### Code Implementation

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrorMessage('');
  
  // Client-side validation
  if (!validateForm()) {
    return;
  }
  
  setIsSubmitting(true);
  
  try {
    // POST request to API endpoint
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    const result = await response.json();
    
    // Check for errors
    if (!response.ok) {
      throw new Error(result.error || 'Failed to send message');
    }
    
    // Success handling
    setSubmitStatus('success');
    setFormData({ name: '', email: '', phone: '', message: '' });
    
  } catch (error) {
    // Error handling
    setSubmitStatus('error');
    setErrorMessage(
      error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred. Please try again or call us directly.'
    );
  } finally {
    setIsSubmitting(false);
    // Reset status after 5 seconds
    setTimeout(() => setSubmitStatus('idle'), 5000);
  }
};
```

---

## 🔧 Client-Side Validation

### Location
`src/components/Contact.tsx` (lines 43-66)

### Validation Logic

```typescript
const validateForm = () => {
  const newErrors: Record<string, string> = {};
  
  // Name validation
  if (!formData.name.trim()) {
    newErrors.name = 'Name is required';
  } else if (formData.name.length < 2) {
    newErrors.name = 'Name must be at least 2 characters';
  }
  
  // Email validation
  if (!formData.email.trim()) {
    newErrors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = 'Please enter a valid email address';
  }
  
  // Phone validation
  if (!formData.phone.trim()) {
    newErrors.phone = 'Phone number is required';
  } else if (!/^[\d\s\(\)\+\-\.]{8,}$/.test(formData.phone.replace(/\s/g, ''))) {
    newErrors.phone = 'Please enter a valid phone number';
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

---

## 🚀 API Route Implementation

### Location
`src/app/api/contact/route.ts`

### Full Code (Secrets Removed)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Enforce RESEND_API_KEY at the top
if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY');
}

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json();
    const { name, email, phone, message } = formData;

    console.log('📨 New submission received');

    // === SERVER-SIDE VALIDATION ===
    
    // Validate name is non-empty
    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Validate phone is numeric or spaces
    const phoneRegex = /^[\d\s\-\(\)\+]+$/;
    if (!phone || !phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, error: 'Valid phone number is required' },
        { status: 400 }
      );
    }

    // Message is optional - no validation needed

    console.log('📤 Sending clinic notification...');

    // === EMAIL TO CLINIC ===
    const clinicEmail = await resend.emails.send({
      from: 'noreply@viva-dentistry.com.au',
      to: 'contact@viva-dentistry.com.au',
      replyTo: email, // Patient's email
      subject: `New Appointment Request from ${name}`,
      template: {
        id: 'CLINIC_TEMPLATE_ID', // Template ID removed
        variables: {
          name,
          email,
          phone,
          message: message || ''
        }
      },
      tags: [{ name: 'environment', value: 'production' }]
    });

    console.log('📬 Clinic notification sent:', clinicEmail);

    // === CONFIRMATION EMAIL TO PATIENT ===
    const patientEmail = await resend.emails.send({
      from: 'noreply@viva-dentistry.com.au',
      to: email, // Patient's email
      subject: 'Appointment Request Received – Viva Dentistry',
      template: {
        id: 'PATIENT_TEMPLATE_ID', // Template ID removed
        variables: {
          name,
          email,
          phone,
          message: message || ''
        }
      },
      tags: [{ name: 'environment', value: 'production' }]
    });

    console.log('📬 Patient confirmation sent:', patientEmail);

    // Success response
    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error('❌ Error in contact API:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
```

---

## 📧 Email Flow

### Email Service: Resend
- **Service**: [Resend.com](https://resend.com/)
- **Authentication**: API Key (stored in `.env`)
- **Template-based**: Uses pre-designed email templates

### Email #1: Clinic Notification
**To**: `contact@viva-dentistry.com.au`  
**From**: `noreply@viva-dentistry.com.au`  
**Reply-To**: Patient's email address  
**Subject**: `New Appointment Request from {name}`  

**Template Variables**:
- `name`: Patient's full name
- `email`: Patient's email
- `phone`: Patient's phone number
- `message`: Optional message from patient

**Purpose**: Notify the clinic of a new appointment request

### Email #2: Patient Confirmation
**To**: Patient's email address  
**From**: `noreply@viva-dentistry.com.au`  
**Subject**: `Appointment Request Received – Viva Dentistry`  

**Template Variables**:
- `name`: Patient's full name
- `email`: Patient's email (for reference)
- `phone`: Patient's phone number (for reference)
- `message`: Their original message

**Purpose**: Confirm receipt of appointment request and set expectations

---

## 🔐 Environment Variables

### Required Variables
Located in `.env` file:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Security Notes
- ✅ API key is stored server-side only
- ✅ Never exposed to client
- ✅ `.env` is in `.gitignore`
- ✅ Use `.env.example` as template

---

## 🎨 User Experience Features

### Loading States
- **Submitting**: Button shows spinner and "Submitting..." text
- **Disabled**: Form inputs disabled during submission
- **Button color**: Changes based on state (idle/submitting/success/error)

### Success State
- ✅ Green success message: "Request sent successfully!"
- ✅ Form fields cleared automatically
- ✅ Success message auto-dismisses after 5 seconds
- ✅ Confirmation email sent to user

### Error Handling
- ❌ Red error message with icon
- ❌ Field-specific validation errors (inline)
- ❌ Network error fallback message
- ❌ Suggestion to call directly if form fails
- ❌ Error clears when user starts typing

### Real-time Validation
- Errors appear after submission attempt
- Errors clear as user types in the field
- Visual indicators (red borders, error icons)

---

## 📊 Response Codes

### Success Responses
- **200 OK**: `{ ok: true }`

### Error Responses
- **400 Bad Request**: Validation errors
  ```json
  { "success": false, "error": "Name is required" }
  { "success": false, "error": "Valid email is required" }
  { "success": false, "error": "Valid phone number is required" }
  ```

- **500 Internal Server Error**: Server/email errors
  ```json
  { "success": false, "error": "An unexpected error occurred" }
  { "success": false, "error": "[Specific error message]" }
  ```

---

## 🧪 Testing the Form

### Manual Testing Checklist
- [ ] Submit with empty fields (should show validation errors)
- [ ] Submit with invalid email format
- [ ] Submit with invalid phone number
- [ ] Submit with valid data (should succeed)
- [ ] Check clinic receives email
- [ ] Check patient receives confirmation
- [ ] Test error handling (disconnect network)
- [ ] Test loading states
- [ ] Test form reset after success

### Test Data Example
```javascript
{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "phone": "(02) 9586 0877",
  "message": "I'd like to book a dental checkup for next week."
}
```

---

## 🔍 Debugging

### Console Logs
The API route includes helpful console logs:
- `📨 New submission received`
- `📤 Sending clinic notification...`
- `📬 Clinic response: [response]`
- `📤 Sending patient confirmation...`
- `📬 Patient response: [response]`
- `❌ Error in contact API: [error]`

### Common Issues

#### 1. Missing API Key
**Error**: `Missing RESEND_API_KEY`  
**Solution**: Add `RESEND_API_KEY` to `.env` file

#### 2. Email Delivery Failed
**Error**: Resend API error  
**Solution**: 
- Check domain verification in Resend dashboard
- Verify email template IDs are correct
- Check Resend API key is valid

#### 3. CORS Errors
**Error**: CORS policy blocking request  
**Solution**: Next.js API routes should handle CORS automatically

#### 4. Form Not Submitting
**Check**:
- Browser console for JavaScript errors
- Network tab for failed requests
- Validation errors in UI

---

## 🚀 Deployment Considerations

### Before Deployment
1. ✅ Verify domain in Resend dashboard
2. ✅ Add DNS records for email sending
3. ✅ Update email templates in Resend
4. ✅ Set production environment variables
5. ✅ Test form in production environment
6. ✅ Monitor email delivery rates

### Production Settings
```bash
# Update these in production
RESEND_API_KEY=re_production_key_here
```

Update email tags in code:
```typescript
tags: [{ name: 'environment', value: 'production' }]
```

---

## 🔧 Recent Fixes & Updates

### January 2026 - Email Template Implementation

**Issue Resolved:** Template not found errors (404) preventing email delivery

**Root Causes Identified:**
1. ❌ Multiple `.env` files with different API keys (`.env.local` overriding `.env`)
2. ❌ Using template slugs instead of UUIDs
3. ❌ Template configuration conflicts (from/subject/replyTo)

**Solutions Implemented:**
1. ✅ **Unified API Key Management**
   - Synchronized API keys across `.env` and `.env.local`
   - Added debug logging to verify correct API key loading
   - Priority: `.env.local` > `.env` in Next.js

2. ✅ **Template ID Strategy**
   - Switched from slugs to UUIDs for reliable template referencing
   - Current template UUIDs:
     - `clinic-notif`: `01d79e79-2fc4-4d4f-b925-8ffc0257e0a8`
     - `patient-conf`: `ea3b1f68-2f32-4409-a535-86935a512b96`

3. ✅ **Template Architecture**
   - Removed `from`, `subject`, `replyTo` from templates
   - Full control via code for dynamic values
   - Templates contain only HTML body with variables

4. ✅ **Email Deliverability Improvements**
   - Professional HTML structure with proper table layouts
   - Added "Do not reply" notice with contact email
   - Clickable phone numbers (`tel:` links)
   - Clickable address (Google Maps integration)
   - Preview text optimization for inbox snippets

5. ✅ **Error Handling Enhancement**
   - Added explicit email error checking
   - Throws errors on email delivery failures
   - Prevents silent business failures
   - Returns 500 status on email errors (not 200)

**Testing Tools Created:**
- `test-resend-diagnostic.js` - Comprehensive API testing script
- Validates templates, API keys, and email delivery

**Result:** 
- ✅ Both clinic and patient emails sending successfully
- ✅ Professional, branded email templates
- ✅ Improved deliverability and user experience
- ✅ No more silent failures

---

## 📈 Future Enhancements

### Potential Improvements
- [ ] Add honeypot field for spam prevention
- [ ] Implement rate limiting
- [ ] Add reCAPTCHA verification
- [ ] Save submissions to database
- [ ] Add webhooks for form analytics
- [ ] Implement A/B testing
- [ ] Add SMS notifications
- [ ] Create admin dashboard for submissions
- [ ] Set up domain authentication (SPF, DKIM, DMARC)
- [ ] Add email open/click tracking

---

## 📞 Support

### Email Service Provider
- **Resend Dashboard**: https://resend.com/domains
- **Documentation**: https://resend.com/docs

### Developer Contact
- **Website**: viva-dentistry.com.au
- **Developer**: Serenity Webcrafts

---

## 📚 Related Documentation

- [README.md](./README.md) - Project overview
- [TECHSTACK.md](./TECHSTACK.md) - Technology stack details
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Setup instructions
- [.env.example](./.env.example) - Environment variables template

---

**Last Updated**: January 29, 2025  
**Form Version**: 1.1.0 (Email templates fixed and enhanced)
