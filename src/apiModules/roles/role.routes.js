const {Router} = require('express');

const {validRole, checkPagination, validateJWT} = require('./../../middleware');

const {roleValidateCreate, roleValidateUpdate, roleValidateId} = require('./validators/role.validator');
const {checkQueryFilters} = require('./middleware/filters.middleware');
const {getUser, getUserList, createUser, updateUser, deleteUser} = require('./role.controller');

const router = Router();

router.use(validateJWT);

router.get('/', [checkPagination, checkQueryFilters], getUserList);

router.get('/:id', [roleValidateId], getUser);

router.post('/', [validRole('ADMIN'), roleValidateCreate], createUser);

router.put('/:id', [validRole('ADMIN'), roleValidateUpdate], updateUser);

router.delete('/:id', [validRole('ADMIN'), roleValidateId], deleteUser);

module.exports = router;
