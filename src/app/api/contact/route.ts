import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Enforce RESEND_API_KEY at the top
if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY');
}

// Debug: Log API key prefix to verify it's loaded correctly
console.log('🔑 Resend API Key loaded:', process.env.RESEND_API_KEY.substring(0, 10) + '...' + process.env.RESEND_API_KEY.slice(-4));

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
    // We control from, subject, and replyTo from code for better control
    const clinicEmail = await resend.emails.send({
      from: 'noreply@viva-dentistry.com.au',
      to: 'contact@viva-dentistry.com.au',
      replyTo: email, // Patient's email for direct reply
      subject: `New Appointment Request from ${name}`,
      template: {
        id: '01d79e79-2fc4-4d4f-b925-8ffc0257e0a8',
        variables: {
          name,
          email,
          phone,
          message: message || 'No message provided'
        }
      }
    });

    console.log('📬 Clinic response:', clinicEmail);

    // Check if clinic email failed
    if (clinicEmail.error) {
      console.error('❌ Clinic email failed:', clinicEmail.error);
      throw new Error(`Failed to send clinic notification: ${clinicEmail.error.message}`);
    }

    console.log('📤 Sending patient confirmation...');

    // Send confirmation email to patient using Resend Template
    // We control from and subject from code for better control
    const patientEmail = await resend.emails.send({
      from: 'noreply@viva-dentistry.com.au',
      to: email,
      subject: 'Appointment Request Received – Viva Dentistry',
      template: {
        id: 'ea3b1f68-2f32-4409-a535-86935a512b96',
        variables: {
          name,
          email,
          phone,
          message: message || 'No message provided'
        }
      }
    });

    console.log('📬 Patient response:', patientEmail);

    // Check if patient email failed
    if (patientEmail.error) {
      console.error('❌ Patient email failed:', patientEmail.error);
      throw new Error(`Failed to send patient confirmation: ${patientEmail.error.message}`);
    }

    // Only return success if BOTH emails sent successfully
    console.log('✅ Both emails sent successfully');
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