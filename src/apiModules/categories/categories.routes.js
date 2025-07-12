const {Router} = require('express');

const {validateJWT, checkPagination, validRole} = require('../../middleware');

const {checkQueryFilters} = require('./middleware/filters.middleware');
const {categoryValidateCreate, categoryValidateUpdate, categoryValidateId} = require('./validators/categories.validator');
const {getCategory, getCategoryList, createCategory, updateCategory, deleteCategory} = require('./categories.controller');

const router = Router();

router.use(validateJWT);

router.get('/', [checkPagination, checkQueryFilters], getCategoryList);

router.get('/:id', [categoryValidateId], getCategory);

router.post('/', [validRole('ADMIN'), categoryValidateCreate], createCategory);

router.put('/:id', [validRole('ADMIN'), categoryValidateUpdate], updateCategory);

router.delete('/:id', [validRole('ADMIN'), categoryValidateId], deleteCategory);

module.exports = router;
