const {request} = require('express');
const createError = require('http-errors');

const {
    secret: {headerToken},
} = require('../../config/config');

const {checkJWT} = require('../helpers');

const {getUserById} = require('../apiModules/users/user.dao');

module.exports = {
    validateJWT: async (req = request, res, next) => {
        try {
            // validate token key exist in headers
            // extract token of headers

            const token = req.header(headerToken) ? req.header(headerToken).split(' ').pop() : null;

            const {uid} = await checkJWT(token);

            const user = await getUserById(uid);

            if (!user || !user.status) {
                throw createError(401, 'Invalid Token');
            }

            req.user = user;

            next();
        } catch (error) {
            next(error);
        }
    },
};
