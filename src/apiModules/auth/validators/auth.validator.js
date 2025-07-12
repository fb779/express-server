const {check} = require('express-validator');

const {validateResult} = require('../../../middleware');

const LoginValidate = [
    check('email', 'Email is required').exists().not().isEmpty().trim().normalizeEmail().isEmail({}),
    check('password', 'Password is required').exists().not().isEmpty(),
    validateResult,
];

const GoogleLoginValidate = [check('id_token').exists().not().isEmpty().trim(), validateResult];

module.exports = {
    LoginValidate,
    GoogleLoginValidate,
};
