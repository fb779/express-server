const CategoryModel = require('./categories.model');

module.exports = {
    getCount: (query = {}) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await CategoryModel.countDocuments(query));
            } catch (error) {
                reject(error);
            }
        });
    },

    getCategoryByName: (name) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await CategoryModel.findByName(name));
            } catch (error) {
                reject(error);
            }
        });
    },

    getCategoryById: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await CategoryModel.findById(id).populate([{path: 'user', select: {uid: 1, email: 1}}]));
            } catch (error) {
                reject(error);
            }
        });
    },

    getCategoryList: (filters, {page, limit}) => {
        return new Promise(async (resolve, reject) => {
            try {
                const offset = limit * (page - 1);

                const data = await CategoryModel.find(filters)
                    .skip(offset)
                    .limit(limit)
                    .populate([
                        {
                            path: 'user',
                            select: {
                                uid: 1,
                                email: 1,
                            },
                        },
                    ]);

                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },

    createCategory: (categoryDto) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await CategoryModel.create(categoryDto);

                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },

    updateCategory: (id, categoryDto) => {
        return new Promise(async (resolve, reject) => {
            try {
                const {...editCategoryInfo} = categoryDto;
                const data = await CategoryModel.findByIdAndUpdate(id, editCategoryInfo, {new: true});

                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },

    deleteCategory: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                // const data = await CategoryModel.findByIdAndRemove(id);
                const data = await CategoryModel.findByIdAndUpdate(id, {status: false}, {new: true});

                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },
};
