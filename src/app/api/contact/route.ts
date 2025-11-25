import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with fallback for build time
const resendApiKey = process.env.RESEND_API_KEY || 'placeholder-key-for-build';
const resend = new Resend(resendApiKey);

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    console.log('📧 Contact form submission received');
    console.log('🔑 API Key check:', process.env.RESEND_API_KEY ? 'Present' : 'Missing');
    
    // Check if Resend API key is properly configured
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'placeholder-key-for-build') {
      console.error('❌ RESEND_API_KEY not configured');
      return NextResponse.json(
        { error: 'Email service not configured. Please contact us directly at (02) 9586 0877.' },
        { status: 503 }
      );
    }

    console.log('✅ RESEND_API_KEY is configured');

    const formData: ContactFormData = await request.json();
    const { name, email, phone, message } = formData;

    console.log('📝 Form data received:', { name, email, phone, hasMessage: !!message });

    // Validate required fields
    if (!name || !email || !phone) {
      console.error('❌ Missing required fields:', { name: !!name, email: !!email, phone: !!phone });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('❌ Invalid email format:', email);
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    console.log('✅ Form validation passed');

    // Prepare email content for clinic
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #8B4513 0%, #D2B48C 100%); padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          <p style="color: #F5F5DC; margin: 10px 0 0 0;">Viva Dentistry Website</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
          <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #8B4513; margin-top: 0;">Contact Information</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
          </div>
          
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; border-left: 4px solid #ffc107;">
            <p style="margin: 0; color: #856404;"><strong>Action Required:</strong> Please contact this patient within 24 hours to confirm their appointment request.</p>
          </div>
        </div>
      </div>
    `;

    console.log('📧 Sending email to clinic...');

    // Send email to clinic (using verified email for testing)
    const clinicEmail = await resend.emails.send({
      from: 'Viva Dentistry <onboarding@resend.dev>',
      to: ['ebad.salehi@gmail.com'], // Using verified email for testing
      subject: `New Appointment Request from ${name}`,
      html: emailContent,
    });

    console.log('📧 Clinic email response:', JSON.stringify(clinicEmail, null, 2));

    // Prepare confirmation email content for patient
    const confirmationContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #8B4513 0%, #D2B48C 100%); padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Contacting Viva Dentistry!</h1>
          <p style="color: #F5F5DC; margin: 10px 0 0 0;">Your appointment request has been received</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
          <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #8B4513; margin-top: 0;">Your Request Details</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
          </div>
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2e7d32; margin-top: 0;">Contact Information</h3>
            <p><strong>Phone:</strong> (02) 9586 0877</p>
            <p><strong>Address:</strong> Park Plaza - Suite 4, 25-35A Park Road, Hurstville NSW 2220</p>
            <p><strong>Office Hours:</strong></p>
            <ul style="margin: 10px 0;">
              <li>Monday - Tuesday: 8:00 AM - 6:00 PM</li>
              <li>Wednesday: Closed</li>
              <li>Thursday - Saturday: 8:00 AM - 6:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
          
          <p style="line-height: 1.6;">If you have any urgent dental concerns, please call us directly at (02) 9586 0877.</p>
          
          <p style="line-height: 1.6;">Best regards,<br>
          The Viva Dentistry Team</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
          <p>This is an automated confirmation email. Please do not reply to this email.</p>
        </div>
      </div>
    `;

    console.log('📧 Sending confirmation email to patient...');

    // Send confirmation email to patient
    const patientEmail = await resend.emails.send({
      from: 'Viva Dentistry <onboarding@resend.dev>',
      to: [email],
      subject: 'Appointment Request Received - Viva Dentistry',
      html: confirmationContent,
    });

    console.log('📧 Patient email response:', JSON.stringify(patientEmail, null, 2));

    return NextResponse.json({
      message: 'Emails sent successfully',
      clinicEmailId: clinicEmail.data?.id,
      patientEmailId: patientEmail.data?.id,
    });

  } catch (error) {
    console.error('❌ Contact form error:', error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { error: 'Failed to send email. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}