const mongoose = require('mongoose');

const booksSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [3, 'Title must be at least 3 characters long'],
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    default: 1,
  }
});

booksSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

booksSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model("Book", booksSchema);