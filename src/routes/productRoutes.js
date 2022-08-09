const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getProducts).post(createProduct);
router.route('/:id').delete(protect, deleteProduct).put(protect, updateProduct);

module.exports = router;
