const express = require('express');
const Book = require('../schemas/bookSchema'); 
const router = express.Router();
const { createBookValidator, updateBookValidator, paramIdValidator } = require('../validators/bookValidator');
const { handleValidationErrors } = require('../validators/bookValidator');

router.post('/', createBookValidator, handleValidationErrors, (req, res) => {

    const { title, author, price, quantity } = req.body;
    const newBook = new Book({ title, author, price, quantity });
    newBook.save()
        .then(() => res.status(201).send(req.t('bookCreated')))
        .catch(err => res.status(500).send(req.t('errorCreatingBook', { error: err.message })));
});

router.get('/', (req, res) => {
    Book.find()
        .then(books => res.status(200).json(books))
    .catch(err => res.status(500).send(req.t('errorFetchingBooks', { error: err.message })));
});

router.get('/:id', paramIdValidator, handleValidationErrors, (req, res) => {
    const { id } = req.params;
    Book.findById(id)
        .then(book => {
            if (!book) {
                return res.status(404).send(req.t('bookNotFound'));
            }
            res.status(200).json(book);
        })
        .catch(err => res.status(500).send(req.t('errorFetchingBook', { error: err.message })));
});

router.put('/:id', updateBookValidator, handleValidationErrors, (req, res) => {
    const { id } = req.params;
    const { title, author, price, quantity } = req.body;
    Book.findByIdAndUpdate(id, { title, author, price, quantity }, { new: true })
        .then(updatedBook => {
            if (!updatedBook) {
                return res.status(404).send(req.t('bookNotFound'));
            }
            res.status(200).json(updatedBook);
        })
        .catch(err => res.status(500).send(req.t('errorUpdatingBook', { error: err.message })));
});

router.delete('/:id', paramIdValidator, handleValidationErrors, (req, res) => {
    const { id } = req.params;
    Book.findByIdAndDelete(id)
        .then(deletedBook => {
            if (!deletedBook) {
                return res.status(404).send(req.t('bookNotFound'));
            }
            res.status(200).send(req.t('bookDeleted'));
        })
        .catch(err => res.status(500).send(req.t('errorDeletingBook', { error: err.message })));
});

module.exports = router;