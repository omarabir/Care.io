import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail, findUserByNID } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { nid, name, email, contact, password } = body;

    // Validation
    if (!nid || !name || !email || !contact || !password) {
      return NextResponse.json(
        { message: 'সব field পূরণ করতে হবে' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'সঠিক email দিন' },
        { status: 400 }
      );
    }

    // Password validation
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password কমপক্ষে ৬ অক্ষরের হতে হবে' },
        { status: 400 }
      );
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);

    if (!hasUpperCase || !hasLowerCase) {
      return NextResponse.json(
        { message: 'Password এ অবশ্যই একটি uppercase এবং একটি lowercase letter থাকতে হবে' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { message: 'এই email দিয়ে ইতিমধ্যে একটি account আছে' },
        { status: 409 }
      );
    }

    // Check if NID already exists
    const existingNID = await findUserByNID(nid);
    if (existingNID) {
      return NextResponse.json(
        { message: 'এই NID দিয়ে ইতিমধ্যে একটি account আছে' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await createUser({
      nid,
      name,
      email,
      contact,
      password: hashedPassword,
      provider: 'credentials'
    });

    return NextResponse.json(
      { 
        message: 'Registration সফল হয়েছে',
        userId: result.insertedId 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Registration এ সমস্যা হয়েছে' },
      { status: 500 }
    );
  }
}