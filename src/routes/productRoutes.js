const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// const { protect } = require('../middleware/authMiddleware');

router.route('/').post(createProduct);
// .get(protect, getProducts)
// router.route('/:id').delete(protect, deleteProduct).put(protect, updateProduct);

module.exports = router;
