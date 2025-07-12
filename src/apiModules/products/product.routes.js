const {Router} = require('express');

const {checkPagination, validRole, validateJWT} = require('../../middleware');

const {checkQueryFilters} = require('./middleware/filters.middleware');
const {productValidateCreate, productValidateUpdate, productValidateId} = require('./validators/product.validator');
const {getProduct, getProductList, createProduct, updateProduct, deleteProduct} = require('./product.controller');

const router = Router();

router.use(validateJWT);

router.get('/', [checkPagination, checkQueryFilters], getProductList);

router.get('/:id', [productValidateId], getProduct);

router.post('/', [validRole('ADMIN'), productValidateCreate], createProduct);

router.put('/:id', [validRole('ADMIN'), productValidateUpdate], updateProduct);

router.delete('/:id', [validRole('ADMIN'), productValidateId], deleteProduct);

module.exports = router;
