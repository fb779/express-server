const mongoose = require('mongoose');

const {
    db: {
        mongooseConfig: {URL, options},
    },
} = require('../../config/config');

const dbConnection = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(URL, {
            useNewUrlParser: options.NEWURL_PARSER,
            useUnifiedTopology: options.UNIFIED_TOPOLOGY,
            // useCreateIndex: options.CREATE_INDEX,
            // useFindAndModify: options.FINDAND_MODIFY,
        });

        console.log(`Database connected`);
    } catch (error) {
        console.log(error);
        throw new Error(`DataBase connection fail`);
    }
};

module.exports = {
    dbConnection,
};
