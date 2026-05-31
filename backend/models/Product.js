import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  brand: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  originalPrice: { type: Number },
  discountPercentage: { type: Number, default: 0 },
  stock: { type: Number, required: true, default: 0 },
  rating: { type: Number, required: true, default: 0 },
  numReviews: { type: Number, required: true, default: 0 },
  image: { type: String, required: true },
  gallery: [{ type: String }],
  featured: { type: Boolean, default: false },
  bestseller: { type: Boolean, default: false },
  newArrival: { type: Boolean, default: false },
  specifications: { type: Map, of: String },
  tags: [{ type: String }],
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
