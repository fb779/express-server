const createError = require('http-errors');
const {getCount, getProductList, createProduct, deleteProduct, updateProduct, getProductById} = require('./product.dao');
const {ProductCreateDTO} = require('./product.dto');

module.exports = {
    getProduct: async (req, res, next) => {
        try {
            const {id = null} = req.params;

            const data = await getProductById(id);

            res.json({data});
        } catch (error) {
            next(error);
        }
    },

    getProductList: async (req, res, next) => {
        try {
            const {filters, pagination} = req;

            const [total, data] = await Promise.all([getCount(filters), getProductList(filters, pagination)]);

            res.json({total, data, pagination});
        } catch (error) {
            next(error);
        }
    },

    createProduct: async (req, res, next) => {
        try {
            const {user} = req;

            const ProductDto = Object.assign(ProductCreateDTO(req.body), {user: user._id});

            const data = await createProduct(ProductDto);

            res.json(data);
        } catch (error) {
            next(error);
        }
    },

    updateProduct: async (req, res, next) => {
        try {
            const {
                params: {id},
                body,
            } = req;

            const ProductDto = ProductCreateDTO(body);

            const data = await updateProduct(id, ProductDto);

            res.json(data);
        } catch (error) {
            next(error);
        }
    },

    deleteProduct: async (req, res, next) => {
        try {
            const {
                params: {id},
            } = req;

            const data = await deleteProduct(id);

            res.json(data);
        } catch (error) {
            next(error);
        }
    },
};
