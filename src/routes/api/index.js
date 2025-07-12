// const {Router} = require('express');
const {
    routes_dir: {apiRoutes},
} = require('../../../config/config');

/**
 * Routes manually
 */

// const router = Router();

// const {validateJWT} = require('../../middleware');
// router.use('/auth', require('../../apiModules/auth/auth.routes'));

// router.use(validateJWT);

// router.use('/categories', require('../../apiModules/categories/categories.routes'));

// router.use('/products', require('../../apiModules/products/product.routes'));
// router.use('/roles', require('../../apiModules/roles/role.routes'));
// router.use('/uploads', require('../../apiModules/upload/upload.routes'));
// router.use('/users', require('../../apiModules/users/user.routes'));

/**
 * Routes
 */
const {includeAllRoutes} = require('../../helpers/load-routes');

module.exports = includeAllRoutes({routerPath: apiRoutes});
