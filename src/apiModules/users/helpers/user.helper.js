const createError = require('http-errors');
const {getUserByEmail, getUserById} = require('../user.dao');

module.exports = {
    emailExist: async (email) => {
        const user = await getUserByEmail(email);
        if (user) {
            return Promise.reject('Email already in use');
        }
    },

    emailExistEdit: async (value, {req}) => {
        const {user} = req;
        const userByEmail = await getUserByEmail(value);

        if (!user) {
            throw createError(500, {message: 'Error, Valid user with out valid token'});
        }

        if (value !== user.email && userByEmail) {
            return Promise.reject('Email already in use');
        }
    },

    userExist: async (id) => {
        const user = await getUserById(id);
        if (!user) {
            return Promise.reject(`Id ${id} doesn't exist`);
        }
    },
};
