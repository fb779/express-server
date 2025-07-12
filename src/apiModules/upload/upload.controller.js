const {uploadFileServer, getImageById, uploadFileCloudinary} = require('./upload.dao');

module.exports = {
    uploadServer: async (req, res, next) => {
        try {
            const {
                fieldName,
                files,
                query: {collection, id},
            } = req;

            // const data = await uploadFileServer({id, collection, file: files[fieldName]});
            const data = await uploadFileCloudinary({id, collection, file: files[fieldName]});

            res.json({data});
        } catch (error) {
            next(error);
        }
    },

    getImageById: async (req, res, next) => {
        try {
            const {
                query: {collection, id},
            } = req;

            const data = await getImageById({id, collection});

            if (!data) {
                return res.json({msg: `File doesn't exist!!`});
            }

            return res.sendFile(data);
        } catch (error) {
            next(error);
        }
    },
};
