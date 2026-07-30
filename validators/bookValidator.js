const { body, param } = require('express-validator')

const createBookValidator = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be a string'),
    body('author')
        .notEmpty().withMessage('Author is required')
        .isString().withMessage('Author must be a string'),
    body('price')
        .notEmpty().withMessage('Price is required')
        .isFloat({ gt: 0 }).withMessage('Price must be a positive number'), 
    body('quantity')
        .notEmpty().withMessage('Quantity is required')
        .isInt({ gt: 0 }).withMessage('Quantity must be a positive integer')       
];

const updateBookValidator = [
    param('id')
        .notEmpty().withMessage('Book ID is required')
        .isMongoId().withMessage('Invalid Book ID'),
    body('title')
        .optional()
        .isString().withMessage('Title must be a string'),
    body('author')
        .optional()
        .isString().withMessage('Author must be a string'),
    body('price')
        .optional()
        .isFloat({ gt: 0 }).withMessage('Price must be a positive number'), 
    body('quantity')
        .optional()
        .isInt({ gt: 0 }).withMessage('Quantity must be a positive integer')       
];

const paramIdValidator = [
    param('id')
        .notEmpty().withMessage('Book ID is required')
        .isMongoId().withMessage('Invalid Book ID')
];

const { validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    createBookValidator,
    updateBookValidator,
    paramIdValidator,
    handleValidationErrors
}