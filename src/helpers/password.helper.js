const bcrypt = require('bcryptjs');

module.exports = {
    encryptPassword: (password) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    },

    isPasswordRigth: (password, hash) => {
        return bcrypt.compare(password, hash);
        // return bcrypt.compareSync(password, hash);
    },
};
