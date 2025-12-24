import { connectDB } from '@/lib/mongodb';
import { Product } from '@/model/Product';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Next.js 15 এ Promise ব্যবহার করতে হয়
) {
  try {
    await connectDB();
    const { id } = await params; // id-টি বের করে নেওয়া

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error during deletion" }, { status: 500 });
  }
}