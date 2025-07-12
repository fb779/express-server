const createError = require('http-errors');
const {getCount, getCategoryList, createCategory, deleteCategory, updateCategory, getCategoryById} = require('./categories.dao');
const {CategoryCreateDTO} = require('./categories.dto');

module.exports = {
    getCategory: async (req, res, next) => {
        try {
            const {id = null} = req.params;
            const data = await getCategoryById(id);
            // if (!data) {
            //     throw createError(400);
            // }
            res.json({data});
        } catch (error) {
            next(error);
        }
    },

    getCategoryList: async (req, res, next) => {
        try {
            // return res.json({msg: `getCategoryList`});
            const {filters, pagination} = req;

            const [total, data] = await Promise.all([getCount(filters), getCategoryList(filters, pagination)]);

            res.json({total, data, pagination});
        } catch (error) {
            next(error);
        }
    },

    createCategory: async (req, res, next) => {
        try {
            const {user} = req;
            // return res.json({msg: `createCategory`});
            const categoryDto = Object.assign(CategoryCreateDTO(req.body), {user: user._id});

            const data = await createCategory(categoryDto);

            res.json(data);
        } catch (error) {
            next(error);
        }
    },

    updateCategory: async (req, res, next) => {
        try {
            const {
                params: {id},
                body,
            } = req;

            const CategoryDto = CategoryCreateDTO(body);

            const data = await updateCategory(id, CategoryDto);

            if (!data) {
                throw createError(400, {message: `Can not update the information`});
            }

            res.json(data);
        } catch (error) {
            next(error);
        }
    },

    deleteCategory: async (req, res, next) => {
        try {
            const {
                params: {id},
            } = req;

            const data = await deleteCategory(id);

            // if (!data) {
            //     throw createError(400, {message: 'Invalid information'});
            // }

            res.json(data);
        } catch (error) {
            next(error);
        }
    },
};
