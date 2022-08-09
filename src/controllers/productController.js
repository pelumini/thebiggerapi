const asyncHandler = require('express-async-handler');

const Product = require('../models/productModel');
const User = require('../models/userModel');

// @desc    Get products
// @route   GET /api/products
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.id });

  res.status(200).json(products);
});

// @desc    Set product
// @route   POST /api/product
// @access  Private
const getProduct = asyncHandler(async (req, res) => {
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

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the product user
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

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the product user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await product.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
