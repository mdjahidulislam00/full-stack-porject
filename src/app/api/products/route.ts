import { connectDB } from '@/lib/mongodb';
import { Product } from '@/model/Product';
import { NextResponse } from 'next/server';

// সব প্রোডাক্ট গেট করা
export async function GET() {
  await connectDB();
  const products = await Product.find({}).sort({ createdAt: -1 });
  return NextResponse.json(products);
}

// নতুন প্রোডাক্ট যোগ করা
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newProduct = await Product.create(body);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}