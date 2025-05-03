import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from 'next/server';
type LoginRequestBody = {
  email: string;
  password: string;
};

type LoginResponse = {
  message: string;
  token?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    if (email === 'admin@example.com' && password === 'password123') {
      console.log({
        message: 'Login successful',
        token: 'fake-jwt-token',
      })
      return NextResponse.json({
        message: 'Login successful',
        token: 'fake-jwt-token',
      });
    }

    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }
}
