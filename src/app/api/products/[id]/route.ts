import { connectDB } from '@/lib/mongodb';
import { Product } from '@/model/Product';
import { NextRequest, NextResponse } from 'next/server';

// ১. ডিলিট অপারেশন (DELETE)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // এখানে Promise ব্যবহার করতে হবে
) {
  await connectDB();
  const { id } = await params; // params-কে await করতে হবে

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Product Deleted Successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Invalid ID or Server Error" }, { status: 500 });
  }
}

// ২. আপডেট অপারেশন (PUT)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // এখানেও Promise
) {
  await connectDB();
  const { id } = await params; // await করা বাধ্যতামূলক
  const body = await request.json();

  try {
    const updated = await Product.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Update Failed" }, { status: 500 });
  }
}