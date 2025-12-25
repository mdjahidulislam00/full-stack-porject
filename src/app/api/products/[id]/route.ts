// src/app/api/products/[id]/route.ts

import { connectDB } from '@/lib/mongodb';
import { Product } from '@/models/Product';
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
    console.error("Delete Error:", error.message || error);
    return NextResponse.json(
      { error: "Server error during deletion" },
      { status: 500 }
    );
}
}