const {check} = require('express-validator');

const {validateResult} = require('../../../middleware');

const {productNameExist, productExist, productNameExistEdit} = require('../helpers/product.helper');
const {categoryListExist} = require('./../../categories/helpers/category.helper');

const productValidateCreate = [
    check('name').exists().not().isEmpty().isString().bail().custom(productNameExist),
    check('image', `Invalid Field`).not().exists().bail(),
    check('price').optional().isNumeric().bail(),
    check('description').optional().not().isEmpty().isString().bail(),
    check('category').isArray().withMessage(`Invalid Category, it must be a list of categories`).bail().custom(categoryListExist),
    validateResult,
];

const productValidateUpdate = [
    check('id', `Invalid Id`).isMongoId().bail().custom(productExist).bail(),
    check('name').exists().not().isEmpty().isString().bail().custom(productNameExistEdit),
    check('image', `Invalid Field`).not().exists().bail(),
    check('price').optional().isNumeric().bail(),
    check('description').optional().not().isEmpty().isString().bail(),
    check('category').custom(categoryListExist),
    validateResult,
];

const productValidateId = [check('id', `Invalid Id`).isMongoId().bail().custom(productExist).bail(), validateResult];

module.exports = {
    productValidateCreate,
    productValidateUpdate,
    productValidateId,
};
