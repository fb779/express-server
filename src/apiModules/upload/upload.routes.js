const {Router} = require('express');
const fileUpload = require('express-fileupload');

const {
    upload: {uploadPath, uploadTmpPath, fileSize, pathTemp},
} = require('./../../../config/config');

const {isValidFile, uploadFields} = require('./validators/upload.validators');
const {uploadServer, getImageById} = require('./upload.controller');

const router = Router();

router.use(
    fileUpload({
        createParentPath: true,
        safeFileNames: true,
        preserveExtension: 4,
        abortOnLimit: true,
        // responseOnLimit: `archivo muy grande`,
        // limitHandler: (req, res) => {
        //     console.log('hola desde el manejador del error de tamaño');
        //     // next();
        // },
        useTempFiles: pathTemp,
        tempFileDir: uploadTmpPath,
        limits: {fileSize},
    })
);

router.get('', uploadFields, getImageById);

router.post('', [...uploadFields, isValidFile({name: 'image', ext: ['jpg', 'jpeg', 'png']})], uploadServer);

module.exports = router;
