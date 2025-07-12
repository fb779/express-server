const RoleModel = require('./role.model');

const {pagination} = require('../../../config/config');

/** Definiciones */
const {DEFAULT_PAGE, DEFAULT_LIMIT} = pagination;

module.exports = {
    getMultipleRoleByName: (names) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await RoleModel.findMultiplyByName(names));
            } catch (error) {
                reject(error);
            }
        });
    },
    getRoleByName: (name) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await RoleModel.findByName(name));
            } catch (error) {
                reject(error);
            }
        });
    },

    getRoleById: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await RoleModel.findById(id));
            } catch (error) {
                reject(error);
            }
        });
    },

    getRoleList: (page = DEFAULT_PAGE, limit = DEFAULT_LIMIT) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await RoleModel.find().skip(parseInt(page)).limit(parseInt(limit));

                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },

    createRole: (roleDto) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await RoleModel.create(roleDto);

                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },

    updateRole: (id, roleDto) => {
        return new Promise(async (resolve, reject) => {
            try {
                // const data = await RoleModel.findByIdAndUpdate(id, roleDto, {...queryOptions, context: 'query'});
                const data = await RoleModel.findByIdAndUpdate(id, roleDto, {new: true});

                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },

    deleteRole: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                // const user = await RoleModel.findByIdAndRemove(id);
                const data = await RoleModel.findByIdAndUpdate(id, {status: false}, {new: true});

                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },
};
