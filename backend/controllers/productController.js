import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

// @desc    Fetch all products with pagination, search, category, and sorting
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const category = req.query.category ? { category: req.query.category } : {};
  const minPrice = req.query.minPrice ? { price: { $gte: Number(req.query.minPrice) } } : {};
  const maxPrice = req.query.maxPrice ? { price: { $lte: Number(req.query.maxPrice) } } : {};
  
  const filter = { ...keyword, ...category };
  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {};
    if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
  }

  let sort = {};
  if (req.query.sortBy) {
    const sortField = req.query.sortBy.split(':')[0];
    const sortOrder = req.query.sortBy.split(':')[1] === 'desc' ? -1 : 1;
    sort[sortField] = sortOrder;
  } else {
    sort = { createdAt: -1 }; // Default sort
  }

  const count = await Product.countDocuments({ ...filter });
  const products = await Product.find({ ...filter })
    .sort(sort)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize), count });
});

// @desc    Fetch single product by id or slug
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).catch(() => null) || 
                  await Product.findOne({ slug: req.params.id });

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Fetch featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ featured: true }).limit(5);
  res.json(products);
});

// @desc    Fetch bestseller products
// @route   GET /api/products/bestsellers
// @access  Public
const getBestsellerProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ bestseller: true }).limit(5);
  res.json(products);
});

// @desc    Fetch new arrival products
// @route   GET /api/products/new-arrivals
// @access  Public
const getNewArrivalProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ newArrival: true }).sort({ createdAt: -1 }).limit(5);
  res.json(products);
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, slug, description, category, brand, price, stock, image } = req.body;

  const product = new Product({
    name,
    slug,
    description,
    category,
    brand,
    price,
    stock,
    image,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, slug, description, category, brand, price, stock, image, featured, bestseller, newArrival, discountPercentage } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.slug = slug || product.slug;
    product.description = description || product.description;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.price = price !== undefined ? price : product.price;
    product.stock = stock !== undefined ? stock : product.stock;
    product.image = image || product.image;
    product.featured = featured !== undefined ? featured : product.featured;
    product.bestseller = bestseller !== undefined ? bestseller : product.bestseller;
    product.newArrival = newArrival !== undefined ? newArrival : product.newArrival;
    product.discountPercentage = discountPercentage !== undefined ? discountPercentage : product.discountPercentage;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById, getFeaturedProducts, getBestsellerProducts, getNewArrivalProducts, createProduct, updateProduct, deleteProduct };
