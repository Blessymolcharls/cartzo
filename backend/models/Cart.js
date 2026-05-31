import mongoose from 'mongoose';

const cartItemSchema = mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  quantity: { type: Number, required: true, default: 1, min: 1 },
});

const cartSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  items: [cartItemSchema],
}, {
  timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
