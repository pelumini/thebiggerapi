const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const User = require('../models/userModel');

// @desc    Create new product
// @route   POST /api/products
// @access  Public
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, imageURL, imageAlt, imageCredit, rating } =
    req.body;
  if (!name || !price || !imageURL || !rating) {
    res.status(400);
    throw new Error('Please add all fields');
  }
  const productExists = await Product.findOne({ name });
  if (productExists) {
    res.status(400);
    throw new Error('Product already exists');
  }
  const product = await Product.create({
    name,
    description,
    price,
    imageURL,
    imageAlt,
    imageCredit,
    rating,
  });

  if (product) {
    res.status(201).json({
      _id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      imageURL: product.imageURL,
      imageAlt: product.imageAlt,
      imageCredit: product.imageCredit,
      rating: product.rating,
    });
  } else {
    res.status(400);
    throw new Error('Invalid product data');
  }
});

// @desc    Get products
// @route   GET /api/products
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

// @desc    Set product
// @route   POST /api/product
// @access  Private
const setProduct = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const product = await Product.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(product);
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error('Product not found');
  }
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedProduct);
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error('Product not found');
  }
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  await product.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  createProduct,
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
};
