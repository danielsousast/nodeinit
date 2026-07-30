const express = require('express');
const Book = require('../schemas/bookSchema'); 
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../validators/bookValidator');

const { createBookValidator, updateBookValidator, paramIdValidator } = require('../validators/bookValidator');

router.post('/', createBookValidator, handleValidationErrors, (req, res) => {

    const { title, author, price, quantity } = req.body;
    const newBook = new Book({ title, author, price, quantity });
    newBook.save()
        .then(() => res.status(201).send('Book created'))
        .catch(err => res.status(500).send('Error creating book: ' + err.message));
});

router.get('/', (req, res) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(err => res.status(500).send('Error fetching books: ' + err.message));
});

router.get('/:id', paramIdValidator, handleValidationErrors, (req, res) => {
    const { id } = req.params;
    Book.findById(id)
        .then(book => {
            if (!book) {
                return res.status(404).send('Book not found');
            }
            res.status(200).json(book);
        })
        .catch(err => res.status(500).send('Error fetching book: ' + err.message));
});

router.put('/:id', updateBookValidator, handleValidationErrors, (req, res) => {
    const { id } = req.params;
    const { title, author, price, quantity } = req.body;
    Book.findByIdAndUpdate(id, { title, author, price, quantity }, { new: true })
        .then(updatedBook => {
            if (!updatedBook) {
                return res.status(404).send('Book not found');
            }
            res.status(200).json(updatedBook);
        })
        .catch(err => res.status(500).send('Error updating book: ' + err.message));
});

router.delete('/:id', paramIdValidator, handleValidationErrors, (req, res) => {
    const { id } = req.params;
    Book.findByIdAndDelete(id)
        .then(deletedBook => {
            if (!deletedBook) {
                return res.status(404).send('Book not found');
            }
            res.status(200).send('Book deleted');
        })
        .catch(err => res.status(500).send('Error deleting book: ' + err.message));
});

module.exports = router;