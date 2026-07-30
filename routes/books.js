const express = require('express');
const router = express.Router();
const { createBookValidator, updateBookValidator, paramIdValidator } = require('../validators/bookValidator');
const { validate } = require('../middlewares/validate');
const { asyncHandler } = require('../utils/asyncHandler');
const booksController = require('../controllers/booksController');

router.post('/', createBookValidator, validate, asyncHandler(booksController.createBook));

router.get('/', asyncHandler(booksController.getBooks));

router.get('/:id', paramIdValidator, validate, asyncHandler(booksController.getBookById));

router.put('/:id', updateBookValidator, validate, asyncHandler(booksController.updateBookById));

router.delete('/:id', paramIdValidator, validate, asyncHandler(booksController.deleteBookById));

module.exports = router;