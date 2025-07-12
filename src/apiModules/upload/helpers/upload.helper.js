const fs = require('fs');
const util = require('util');
const path = require('path');
const {v4: uuid} = require('uuid');

const {
    upload: {uploadPath, collections},
} = require('./../../../../config/config');

module.exports = {
    moveFile: async (file, filePath) => {
        try {
            Reflect.has(file, 'mv') && (await util.promisify(file.mv)(filePath));
            return Promise.resolve(true);
        } catch (err) {
            // throw err;
            return Promise.reject(err);
        }
    },

    removeFile: (filePath) => {
        try {
            if (filePath && fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                return Promise.resolve(true);
            }
            return Promise.resolve(false);
        } catch (err) {
            // throw err;
            return Promise.reject(err);
        }
    },

    definePath: (name, folder = 'files') => {
        const ext = name.split('.').pop();
        const nameDocument = `${uuid()}.${ext}`;
        return {name: nameDocument, pathFile: path.join(uploadPath, folder, nameDocument)};
    },

    getUploadPath: (name, folder = 'files') => {
        const filePath = path.join(uploadPath, folder, name);
        if (name && fs.existsSync(filePath)) {
            return filePath;
        }
        return null;
    },

    // Valid the path directory exist
    validPath: (pathValue) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(fs.existsSync(pathValue));
            } catch (err) {
                reject(err);
            }
        });
    },

    // Valid the path directory has permissions to writhe and read
    validPermissions: (pathValue) => {
        return new Promise((resolve, reject) => {
            try {
                // resolve(fs.accessSync(pathValue, fs.constants.F_OK | fs.constants.W_OK | fs.constants.R_OK));
                resolve(fs.accessSync(pathValue, fs.constants.W_OK | fs.constants.R_OK));
            } catch (err) {
                reject(err);
            }
        });
    },

    validCollections: async (cl, {req}) => {
        const validCollections = Object.values(collections);

        if (!validCollections.includes(cl)) {
            return Promise.reject(`Invalid Collection - ${validCollections}`);
        }
    },
};
