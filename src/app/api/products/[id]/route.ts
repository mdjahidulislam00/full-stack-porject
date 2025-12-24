import { connectDB } from '@/lib/mongodb';
import { Product } from '@/model/Product';
import { NextResponse } from 'next/server';

// ডিলিট অপারেশন
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Product.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Product Deleted Successfully" });
}

// আপডেট অপারেশন
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const updated = await Product.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}