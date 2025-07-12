const {Router} = require('express');

const {userValidateCreate, userValidateUpdate, userValidateDelete} = require('./validators/user.validator');

const {checkQueryFilters} = require('./middleware/filters.middleware');
const {mongooseValidateObjecID, checkPagination, validRole, validateJWT} = require('../../middleware');

const {getUser, getUserList, createUser, updateUser, deleteUser} = require('./user.controller');

const router = Router();

router.use(validateJWT);

router.get('/', [checkPagination, checkQueryFilters], getUserList);

router.get('/:id', [mongooseValidateObjecID], getUser);

router.post('/', [validRole('ADMIN'), userValidateCreate], createUser);

router.put('/:id', [validRole('ADMIN'), mongooseValidateObjecID, userValidateUpdate], updateUser);

router.delete('/:id', [validRole('ADMIN'), userValidateDelete], deleteUser);

module.exports = router;
