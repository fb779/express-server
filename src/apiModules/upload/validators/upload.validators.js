const createError = require('http-errors');
const {check} = require('express-validator');

const {validateResult} = require('./../../../middleware');

const {validCollections} = require('../helpers/upload.helper');

module.exports = {
    uploadFields: [check('id').isMongoId().bail(), check('collection').toLowerCase().custom(validCollections), validateResult],

    isValidFile: ({name = 'file', ext = []}) => {
        return (req, res, next) => {
            const {files} = req;

            if (!files || Object.keys(files).length === 0 || !files[name]) {
                return next(createError(400, {message: `No files were uploaded - ${name}.`}));
            }

            const {[name]: file} = files;

            const name_ext = file.name.split('.').pop();

            if (!ext.includes(name_ext)) {
                return next(createError(400, {message: `The extension '${name_ext}' is incorrect.`}));
            }

            req.fieldName = name;

            next();
        };
    },
};
