import asyncHandler from 'express-async-handler';
import Cart from '../models/Cart.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  
  if (cart) {
    res.json(cart);
  } else {
    // If no cart, return empty structure
    res.json({ user: req.user._id, items: [] });
  }
});

// @desc    Sync user cart (Overwrite with frontend cart)
// @route   POST /api/cart/sync
// @access  Private
const syncCart = asyncHandler(async (req, res) => {
  const { items } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    cart.items = items;
    const updatedCart = await cart.save();
    res.json(await updatedCart.populate('items.product'));
  } else {
    cart = new Cart({
      user: req.user._id,
      items,
    });
    const createdCart = await cart.save();
    res.status(201).json(await createdCart.populate('items.product'));
  }
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/update
// @access  Private
const updateCartItem = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
      const updatedCart = await cart.save();
      res.json(await updatedCart.populate('items.product'));
    } else {
      res.status(404);
      throw new Error('Item not found in cart');
    }
  } else {
    res.status(404);
    throw new Error('Cart not found');
  }
});

// @desc    Clear user cart
// @route   DELETE /api/cart/clear
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    cart.items = [];
    await cart.save();
    res.json({ message: 'Cart cleared' });
  } else {
    res.status(404);
    throw new Error('Cart not found');
  }
});

export { getCart, syncCart, updateCartItem, clearCart };
