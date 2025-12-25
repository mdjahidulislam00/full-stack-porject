import { connectDB } from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { NextResponse } from 'next/server';

// সব প্রোডাক্ট গেট করা
export async function GET() {
  await connectDB();
  const products = await Product.find({}).sort({ createdAt: -1 });
  return NextResponse.json(products);
}

