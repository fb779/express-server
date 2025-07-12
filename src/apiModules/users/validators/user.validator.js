const {check} = require('express-validator');

const {validateResult} = require('./../../../middleware');

const {roleExist} = require('./../../roles/helpers/role.helper');

const {emailExist, emailExistEdit, userExist} = require('./../helpers/user.helper');

const userValidateCreate = [
    check('first_name').exists().not().isEmpty().isString().bail(),
    check('last_name').exists().not().isEmpty().isString().bail(),
    check('email').exists().not().isEmpty().trim().normalizeEmail().isEmail().bail().custom(emailExist),
    check('password').exists().not().isEmpty().isStrongPassword().withMessage(`The password is insecure`),
    check('role').exists().not().isEmpty().bail().custom(roleExist),
    validateResult,
];

const userValidateUpdate = [
    check('id', `Invalid Id`).isMongoId().bail().custom(userExist).bail(),
    check('first_name').exists().not().isEmpty().isString().bail(),
    check('last_name').exists().not().isEmpty().isString().bail(),
    check('email').exists().not().isEmpty().trim().normalizeEmail().isEmail().bail().custom(emailExistEdit),
    check('password').optional().not().isEmpty().isStrongPassword().withMessage(`The password is insecure`),
    check('role').exists().not().isEmpty().bail().custom(roleExist),
    validateResult,
];

const userValidateDelete = [check('id', `Invalid Id`).isMongoId().bail().custom(userExist).bail(), validateResult];

module.exports = {
    userValidateCreate,
    userValidateUpdate,
    userValidateDelete,
};
