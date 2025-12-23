import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// MongoDB Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// Connect to MongoDB
const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) return;
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

// Initialize connection
connectDB();

// GET /api/products
export async function GET() {
    try {
        await connectDB();
        const products = await Product.find({});
        return NextResponse.json(products);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST /api/products
export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json();
        const { name, price, category } = body;

        const newProduct = new Product({
            name,
            price,
            category: category || 'Uncategorized'
        });
        await newProduct.save();

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}