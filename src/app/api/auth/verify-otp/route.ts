import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { contact, otp, type } = await request.json();

    if (!contact || !otp || !type) {
      return NextResponse.json(
        { success: false, error: 'Contact, OTP, and type are required' },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Find the OTP record
    const otpRecord = await db.collection('otps').findOne({
      contact,
      type,
      otp,
      verified: false,
      expiresAt: { $gt: new Date() },
    });

    if (!otpRecord) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired OTP' },
        { status: 401 }
      );
    }

    // Mark OTP as verified
    await db.collection('otps').updateOne(
      { _id: otpRecord._id },
      { $set: { verified: true } }
    );

    // Find or create user
    const userField = type === 'email' ? 'email' : 'phone';
    let user = await db.collection('users').findOne({ [userField]: contact });

    if (!user) {
      // Create new user
      const newUser = {
        [userField]: contact,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await db.collection('users').insertOne(newUser);
      user = await db.collection('users').findOne({ _id: result.insertedId });
    }

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Failed to create user' },
        { status: 500 }
      );
    }

    const token = generateToken(user as any);

    return NextResponse.json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
