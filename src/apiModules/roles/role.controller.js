const createError = require('http-errors');
const {getRoleById, getRoleList, createRole, updateRole, deleteRole} = require('./role.dao');
const {RoleCreateDTO} = require('./role.dto');

module.exports = {
    getUser: async (req, res, next) => {
        try {
            const {id = null} = req.params;

            const data = await getRoleById(id);

            if (!data) {
                throw createError(400);
                // return next(createError(404));
            }

            res.json(data);
        } catch (error) {
            next(error);
        }
    },

    getUserList: async (req, res, next) => {
        try {
            const {
                query,
                query: {page, limit},
            } = req;

            const data = await getRoleList(page, limit);

            res.json({data, query});
        } catch (error) {
            next(error);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const userDto = RoleCreateDTO(req.body);

            const data = await createRole(userDto);

            res.json(data);
        } catch (error) {
            next(error);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {
                params: {id},
            } = req;

            const userDto = RoleCreateDTO(req.body);

            const data = await updateRole(id, userDto);

            // if (!data) {
            //     throw createError(400);
            // }

            res.json(data);
        } catch (error) {
            next(error);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {
                params: {id},
            } = req;

            const data = await deleteRole(id);

            // if (!data) {
            //     throw createError(400);
            // }

            res.json(data);
        } catch (error) {
            next(error);
        }
    },
};
