const createError = require('http-errors');
const {getMultipleRoleByName} = require('../apiModules/roles/role.dao');

module.exports = {
    validRole: (...roles) => {
        return async (req, res, next) => {
            try {
                const [all] = roles;
                const {
                    user = null,
                    user: {role: user_role = null},
                } = req;

                if (!user) {
                    throw createError(500, {message: 'Error, Valid user with out valid token'});
                }

                const rolesDB = await getMultipleRoleByName(roles);

                if (!rolesDB || !rolesDB.some((item) => user_role.id === item.id)) {
                    throw createError(401, {message: `Invalid Role, you don't have enough permissions`});
                }

                next();
            } catch (error) {
                next(error);
            }
        };
    },
};
