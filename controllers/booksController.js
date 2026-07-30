const booksService = require("../services/booksService");

const createBook = async (req, res) => {
  const { title, author, price, quantity } = req.body;
  await booksService.createBook({ title, author, price, quantity });

  return res.status(201).json({
    success: true,
    message: req.t("bookCreated"),
  });
};

const getBooks = async (req, res) => {
  const books = await booksService.getBooks();

  return res.status(200).json({
    success: true,
    data: books,
  });
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  const book = await booksService.getBookById(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      error: {
        code: "BOOK_NOT_FOUND",
        message: req.t("bookNotFound"),
      },
    });
  }

  return res.status(200).json({
    success: true,
    data: book,
  });
};

const updateBookById = async (req, res) => {
  const { id } = req.params;
  const { title, author, price, quantity } = req.body;

  const updatedBook = await booksService.updateBookById(id, {
    title,
    author,
    price,
    quantity,
  });

  if (!updatedBook) {
    return res.status(404).json({
      success: false,
      error: {
        code: "BOOK_NOT_FOUND",
        message: req.t("bookNotFound"),
      },
    });
  }

  return res.status(200).json({
    success: true,
    data: updatedBook,
  });
};

const deleteBookById = async (req, res) => {
  const { id } = req.params;
  const deletedBook = await booksService.deleteBookById(id);

  if (!deletedBook) {
    return res.status(404).json({
      success: false,
      error: {
        code: "BOOK_NOT_FOUND",
        message: req.t("bookNotFound"),
      },
    });
  }

  return res.status(200).json({
    success: true,
    message: req.t("bookDeleted"),
  });
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};
