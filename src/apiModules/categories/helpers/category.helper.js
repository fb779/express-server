const {getCategoryById, getCategoryByName} = require('../categories.dao');

module.exports = {
    categoryExist: async (id) => {
        const category = await getCategoryById(id);
        if (!category) {
            return Promise.reject(`Id ${id} doesn't exist`);
        }
    },

    categoryListExist: async (list) => {
        const category = await Promise.all(list.map((id) => getCategoryById(id)));

        if (category.some((item) => !item)) {
            return Promise.reject(`Invalid Category, one or more categories doesn't exist`);
        }
    },

    categoryNameExist: async (name) => {
        const category = await getCategoryByName(name);
        if (category) {
            return Promise.reject('Category name already exist');
        }
    },

    categoryNameExistEdit: async (name, {req}) => {
        const {id} = req.params;
        const category = await getCategoryById(id);
        const category_name = await getCategoryByName(name);
        if (name.toUpperCase() !== category.name && category_name) {
            return Promise.reject(`Category name already exist`);
        }
    },
};
