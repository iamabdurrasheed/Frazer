import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { generateOTP, validateEmail, validatePhone } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { contact, type } = await request.json();

    if (!contact || !type) {
      return NextResponse.json(
        { success: false, error: 'Contact and type are required' },
        { status: 400 }
      );
    }

    // Validate contact based on type
    if (type === 'email' && !validateEmail(contact)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (type === 'phone' && !validatePhone(contact)) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone format' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const otp = generateOTP();

    // Store OTP in database with expiration (5 minutes)
    const otpDoc = {
      contact,
      type,
      otp,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
      verified: false,
    };

    // Remove any existing OTPs for this contact
    await db.collection('otps').deleteMany({ contact, type });
    
    // Insert new OTP
    await db.collection('otps').insertOne(otpDoc);

    // TODO: Send OTP via SMS or Email
    // For development, log the OTP
    console.log(`OTP for ${contact} (${type}): ${otp}`);

    // In production, integrate with SMS/Email service:
    // if (type === 'email') {
    //   await sendEmailOTP(contact, otp);
    // } else {
    //   await sendSMSOTP(contact, otp);
    // }

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}
