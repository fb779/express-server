const createError = require('http-errors');

const {
    upload: {collections, image_default},
} = require('./../../../config/config');

const UserDao = require('./../users/user.dao');
const ProductDao = require('./../products/product.dao');
const CategoryDao = require('./../categories/categories.dao');

const {definePath, moveFile, removeFile, getUploadPath} = require('./helpers/upload.helper');
const {uploadFileCloudinary, removeFileCloudinary} = require('./helpers/cloudinary.helper');

module.exports = {
    getImageById: ({collection, id}) => {
        return new Promise(async (resolve, reject) => {
            try {
                let model;

                switch (collection) {
                    case collections.products:
                        model = await ProductDao.getProductById(id);
                        break;
                    case collections.users:
                        model = await UserDao.getUserById(id);
                        break;
                    case collections.category:
                        model = await CategoryDao.getCategoryById(id);
                        break;

                    default:
                        throw createError(500, {message: `Collection not supported`});
                        break;
                }

                if (!model) {
                    throw createError(400, {message: `Id ${id} doesn't exist`});
                }

                if (!model.image) {
                    return resolve(image_default);
                    // throw createError(400, {message: `Image don't exist`});
                }

                const fileUpPath = getUploadPath(model.image, collection);

                resolve(fileUpPath);
            } catch (error) {
                return reject(error);
            }
        });
    },

    uploadFileServer: ({collection, id, file}) => {
        return new Promise(async (resolve, reject) => {
            try {
                let model;

                switch (collection) {
                    case collections.products:
                        model = await ProductDao.getProductById(id);
                        break;
                    case collections.users:
                        model = await UserDao.getUserById(id);
                        break;
                    case collections.category:
                        model = await CategoryDao.getCategoryById(id);
                        break;

                    default:
                        throw createError(500, {message: `Collection not supported`});
                        break;
                }

                if (!model) {
                    throw createError(400, {message: `Id ${id} doesn't exist`});
                }

                if (model.image) {
                    const fileUpPath = getUploadPath(model.image, collection);
                    await removeFile(fileUpPath);
                }

                const {name, pathFile} = definePath(file.name, collection);

                const fff = await moveFile(file, pathFile);

                model.image = name;

                await model.save();

                return resolve(true);
            } catch (error) {
                removeFile(file.tempFilePath);
                return reject(error);
            }
        });
    },

    uploadFileCloudinary: ({collection, id, file}) => {
        return new Promise(async (resolve, reject) => {
            try {
                let model;

                switch (collection) {
                    case collections.products:
                        model = await ProductDao.getProductById(id);
                        break;
                    case collections.users:
                        model = await UserDao.getUserById(id);
                        break;
                    case collections.category:
                        model = await CategoryDao.getCategoryById(id);
                        break;

                    default:
                        throw createError(500, {message: `Collection not supported`});
                        break;
                }

                if (!model) {
                    throw createError(400, {message: `Id ${id} doesn't exist`});
                }

                if (model.image) {
                    // const fileUpPath = getUploadPath(model.image, collection);
                    // await removeFile(fileUpPath);
                    await removeFileCloudinary(model.image);
                }

                // const {name, pathFile} = definePath(file.name, collection);

                const {secure_url: name} = await uploadFileCloudinary(file);

                model.image = name;

                await model.save();

                return resolve(true);
            } catch (error) {
                removeFile(file.tempFilePath);
                return reject(error);
            }
        });
    },
};
