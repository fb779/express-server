const path = require('path');

const cloudinary = require('cloudinary').v2;

const {
    upload: {cloudinary_url, cloudinary_folder},
} = require('./../../../../config/config');
const {removeFile} = require('./upload.helper');

cloudinary.config(cloudinary_url);

module.exports = {
    uploadFileCloudinary: async (file) => {
        try {
            // TODO: destructur variable of express-file-upload's properties.
            const {tempFilePath} = file;

            const resp = await cloudinary.uploader.upload(tempFilePath, {folder: cloudinary_folder});

            // TODO: remove temp file upload on the server
            removeFile(tempFilePath);

            return Promise.resolve(resp);
        } catch (err) {
            return Promise.reject(err);
        }
    },

    removeFileCloudinary: async (filePath, folder = false) => {
        try {
            // const namefolder = filePath.split('/')[];
            const nameFile = filePath.split('/').pop();

            const public_id = path.join(cloudinary_folder, nameFile.split('.').shift());

            const resp = await cloudinary.uploader.destroy(public_id);

            return Promise.resolve(true);
        } catch (err) {
            // throw err;
            return Promise.reject(err);
        }
    },
};
