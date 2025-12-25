// src/app/api/products/[id]/route.ts

import { connectDB } from '@/lib/mongodb';
import { Product } from '@/models/Product'; // নিশ্চিত করুন ফোল্ডার নাম 'models' নাকি 'model'
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // Next.js 15 অনুযায়ী params await করতে হবে
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!id) {
      return NextResponse.json({ error: "ID is missing" }, { status: 400 });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Delete Error:", error.message);
    return NextResponse.json({ error: "Server error during deletion" }, { status: 500 });
  }
}

// ৪-০-৫ এরর এড়াতে PUT বা GET (ID ভিত্তিক) ফাংশনও এই ফাইলে রাখতে পারেন
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await params;
  const product = await Product.findById(id);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}