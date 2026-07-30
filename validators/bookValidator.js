const { body, param } = require('express-validator')

const createBookValidator = [
    body('title')
        .notEmpty().withMessage((value, { req }) => req.t('validationTitleRequired'))
        .isString().withMessage((value, { req }) => req.t('validationTitleString')),
    body('author')
        .notEmpty().withMessage((value, { req }) => req.t('validationAuthorRequired'))
        .isString().withMessage((value, { req }) => req.t('validationAuthorString')),
    body('price')
        .notEmpty().withMessage((value, { req }) => req.t('validationPriceRequired'))
        .isFloat({ gt: 0 }).withMessage((value, { req }) => req.t('validationPricePositiveNumber')), 
    body('quantity')
        .notEmpty().withMessage((value, { req }) => req.t('validationQuantityRequired'))
        .isInt({ gt: 0 }).withMessage((value, { req }) => req.t('validationQuantityPositiveInteger'))       
];

const updateBookValidator = [
    param('id')
        .notEmpty().withMessage((value, { req }) => req.t('validationBookIdRequired'))
        .isMongoId().withMessage((value, { req }) => req.t('validationInvalidBookId')),
    body('title')
        .optional()
        .isString().withMessage((value, { req }) => req.t('validationTitleString')),
    body('author')
        .optional()
        .isString().withMessage((value, { req }) => req.t('validationAuthorString')),
    body('price')
        .optional()
        .isFloat({ gt: 0 }).withMessage((value, { req }) => req.t('validationPricePositiveNumber')), 
    body('quantity')
        .optional()
        .isInt({ gt: 0 }).withMessage((value, { req }) => req.t('validationQuantityPositiveInteger'))       
];

const paramIdValidator = [
    param('id')
    .notEmpty().withMessage((value, { req }) => req.t('validationBookIdRequired'))
    .isMongoId().withMessage((value, { req }) => req.t('validationInvalidBookId'))
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