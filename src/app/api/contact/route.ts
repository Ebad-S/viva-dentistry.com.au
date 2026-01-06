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

    // Send email to clinic using Resend Template
    const clinicEmail = await resend.emails.send({
      from: 'noreply@viva-dentistry.com.au',
      to: 'contact@viva-dentistry.com.au',
      replyTo: email,
      subject: `New Appointment Request from ${name}`,
      template: {
        id: '669829cc-c80f-493f-9ae7-8a5da82a4fb7',
        variables: {
          name,
          email,
          phone,
          message: message || ''
        }
      },
      tags: [{ name: 'environment', value: 'local-dev' }]
    });

    console.log('📬 Clinic response:', clinicEmail);

    console.log('📤 Sending patient confirmation...');

    // Send confirmation email to patient using Resend Template
    const patientEmail = await resend.emails.send({
      from: 'noreply@viva-dentistry.com.au',
      to: email,
      subject: 'Appointment Request Received – Viva Dentistry',
      template: {
        id: '8d593c7f-9911-4993-bda3-d2e72408b21d',
        variables: {
          name,
          email,
          phone,
          message: message || ''
        }
      },
      tags: [{ name: 'environment', value: 'local-dev' }]
    });

    console.log('📬 Patient response:', patientEmail);

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