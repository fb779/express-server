const {check} = require('express-validator');

const {validateResult} = require('../../../middleware');

const {roleExist, roleNameExist} = require('../helpers/role.helper');
const {getRoleByName} = require('../role.dao');

const roleValidateCreate = [check('name').exists().not().isEmpty().isString().bail().custom(roleNameExist), validateResult];

const roleValidateUpdate = [check('id', `Invalid Id`).isMongoId().bail().custom(roleExist).bail(), check('name').exists().not().isEmpty().isString().bail().custom(roleNameExist), validateResult];

const roleValidateId = [check('id', `Invalid Id`).isMongoId().bail().custom(roleExist).bail(), validateResult];

module.exports = {
    roleValidateCreate,
    roleValidateUpdate,
    roleValidateId,
};
