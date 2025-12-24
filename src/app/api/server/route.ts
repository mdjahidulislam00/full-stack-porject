import { NextResponse } from 'next/server';

// এটি সরাসরি Next.js এর GET handler
export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Backend logic is running inside Next.js!"
  });
}