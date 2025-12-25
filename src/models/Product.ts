import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category: String,
  image: String, // Cloudinary বা অন্য লিঙ্কের জন্য
  stock: { type: Number, default: 0 },
}, { timestamps: true });

export const Product = models.Product || model('Product', ProductSchema);