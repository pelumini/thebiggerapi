const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    imageURL: {
      type: String,
      required: [true, 'Please add image URL'],
    },
    imageAlt: {
      type: String,
    },
    imageCredit: {
      type: String,
    },
    rating: {
      type: Number,
      required: [true, 'Please add a rating'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
