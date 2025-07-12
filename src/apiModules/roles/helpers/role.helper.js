const {getRoleById, getRoleByName} = require('./../role.dao');

module.exports = {
    roleExist: async (id) => {
        const role = await getRoleById(id);
        if (!role) {
            return Promise.reject(`Invalid Role, It doesn't exist`);
        }
    },

    roleNameExist: async (value, {req}) => {
        const role = await getRoleByName(value);
        if (!role) {
            return Promise.reject(`Invalid Role, It doesn't exist`);
        }
    },

    roleNameExistEdit: async (name, {req}) => {
        const {user} = req;
        const role = await getRoleByName(name);

        if (!user) {
            throw createError(500, {message: 'Error, Valid user with out valid token'});
        }

        if (value !== user.role.name && role) {
            return Promise.reject(`Invalid Role, It doesn't exist`);
        }
    },
};
