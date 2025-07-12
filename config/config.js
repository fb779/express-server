const path = require('path');

const booleanNormalize = (value) => {
    return value === 'true';
};

const ROOT_DIR = path.join(__dirname, '..', 'src');

module.exports = {
    server: {
        PORT: process.env.PORT || 3000,
        origin: (() => {
            return process.env.ORIGIN ? process.env.ORIGIN.split(',').filter((item) => item.trim() != '') : false;
        })(),
        titleApp: 'My App',
    },
    db: {
        mongooseConfig: {
            URL: process.env.DB_URL,
            options: {
                NEWURL_PARSER: booleanNormalize(process.env.DB_CONF_NEWURL_PARSER),
                UNIFIED_TOPOLOGY: booleanNormalize(process.env.DB_CONF_UNIFIED_TOPOLOGY),
                CREATE_INDEX: booleanNormalize(process.env.DB_CONF_CREATE_INDEX), //TODO: deprecade in mongoose v6
                FINDAND_MODIFY: booleanNormalize(process.env.DB_CONF_FINDAND_MODIFY), //TODO: deprecade in mongoose v6
            },
        },
    },
    secret: {
        jwtKey: process.env.SECRET_PRIVATE_KEY,
        expireTime: process.env.EXPIRE_TOKEN,
        headerToken: process.env.HEADER_TOKEN,
    },
    pagination: {
        DEFAULT_PAGE: 1,
        DEFAULT_LIMIT: 10,
    },
    google: {
        google_src: process.env.GOOGLE_SRC,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
    },
    upload: {
        cloudinary_url: process.env.CLOUDINARY_URL,
        cloudinary_folder: process.env.CLOUDINARY_FOLDER,
        pathTemp: true,
        uploadTmpPath: path.join(__dirname, '../tmp/'),
        uploadPath: path.join(__dirname, '../uploads/'),
        fileSize: 6 * 1024 * 1024,
        directories: {
            documents: 'documents',
            avatars: 'avatars',
        },
        image_default: path.join(__dirname, '..', 'assets', 'images', 'image-default.png'),
        collections: {
            products: 'products',
            users: 'users',
            category: 'category',
        },
    },
    routes_dir: {
        apiRoutes: path.join(ROOT_DIR, 'apiModules'),
        // web: path.join(ROOT_DIR, 'webModules'),
    },
};
