const Book = require("../schemas/bookSchema");

const createBook = async (payload) => {
  const book = new Book(payload);
  return book.save();
};

const getBooks = async () => {
  return Book.find();
};

const getBookById = async (id) => {
  return Book.findById(id);
};

const updateBookById = async (id, payload) => {
  return Book.findByIdAndUpdate(id, payload, { new: true });
};

const deleteBookById = async (id) => {
  return Book.findByIdAndDelete(id);
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};
