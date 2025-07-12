const mongoose = require('mongoose');

module.exports = {
    isValidObjectId: (value) => {
        return mongoose.Types.ObjectId.isValid(value);
    },
};
