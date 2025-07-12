const {getProductById, getProductByName} = require('../product.dao');

module.exports = {
    productExist: async (id) => {
        const product = await getProductById(id);
        if (!product) {
            return Promise.reject(`Id ${id} doesn't exist`);
        }
    },

    productNameExist: async (name) => {
        const product = await getProductByName(name);
        if (product) {
            return Promise.reject('Product name already exist');
        }
    },

    productNameExistEdit: async (name, {req}) => {
        const {id} = req.params;
        const product = await getProductById(id);
        const product_name = await getProductByName(name);
        if (name !== product.name && product_name) {
            return Promise.reject(`Product name already exist`);
        }
    },
};
