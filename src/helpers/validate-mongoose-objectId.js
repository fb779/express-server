const mongoose = require('mongoose');

module.exports = {
  validateObjectId: (value) => {
    return mongoose.Types.ObjectId.isValid(value);
  },
};
