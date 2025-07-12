const createError = require('http-errors');
const jwt = require('jsonwebtoken');

const {
    secret: {jwtKey, expireTime},
} = require('../../config/config');

module.exports = {
    generateJWT: async (payload = {}) => {
        return new Promise((resolve, reject) => {
            try {
                const token = jwt.sign(payload, jwtKey, {expiresIn: expireTime});
                return resolve(token);
            } catch (error) {
                return reject(error);
            }
        });
    },

    checkJWT: (token) => {
        return new Promise((resolve, reject) => {
            try {
                const payload = jwt.verify(token, jwtKey);
                return resolve(payload);
            } catch (error) {
                console.log(`token error message: ${error.message}`);
                // return reject(error);
                return reject(createError(401, `Invalid Token - ${error.message}`));
            }
        });
    },
};
