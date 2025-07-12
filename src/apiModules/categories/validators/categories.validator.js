const {check} = require('express-validator');

const {validateResult} = require('./../../../middleware');
const {userExist} = require('./../../users/helpers/user.helper');

const {categoryNameExist, categoryExist, categoryNameExistEdit} = require('../helpers/category.helper');

const categoryValidateCreate = [
    check('name').exists().not().isEmpty().isString().bail().custom(categoryNameExist),
    check('image').optional().isString().bail(),
    // check('status').optional().bail().isBoolean(),
    // check('user').exists().not().isEmpty().bail().custom(isRoleValid),
    validateResult,
];

const categoryValidateUpdate = [
    check('id', `Invalid Id`).isMongoId().bail().custom(categoryExist).bail(),
    check('name').exists().not().isEmpty().isString().bail().custom(categoryNameExistEdit),
    check('image').optional().isString().bail(),
    // check('status').optional().bail().isBoolean(),
    // check('user', `Invalid User`).isMongoId().bail().custom(userExist).bail(),
    validateResult,
];

const categoryValidateId = [check('id', `Invalid Id`).isMongoId().bail().custom(categoryExist).bail(), validateResult];

module.exports = {
    categoryValidateCreate,
    categoryValidateUpdate,
    categoryValidateId,
};
