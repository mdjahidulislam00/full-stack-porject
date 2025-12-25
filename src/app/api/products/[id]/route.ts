import { connectDB } from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });

  } catch (error: unknown) {
    // টাইপস্ক্রিপ্ট এরর হ্যান্ডলিং ঠিক করার প্রফেশনাল উপায়
    let errorMessage = "An unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Delete Error:", errorMessage);

    return NextResponse.json(
      { error: "Server error during deletion", details: errorMessage },
      { status: 500 }
    );
  }
}