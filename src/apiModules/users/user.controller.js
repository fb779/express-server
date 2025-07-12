const createError = require('http-errors');
const {getCount, getUserList, getUserById, createUser, updateUser, deleteUser} = require('./user.dao');
const {UserCreateDTO} = require('./user.dto');
const Notifier = require('../../class/notifications');

module.exports = {
    getUser: async (req, res, next) => {
        try {
            const {id = null} = req.params;

            const data = await getUserById(id);

            if (!data) {
                throw createError(400);
                // return next(createError(404));
            }

            //   Notifier.socket().emit("cosa-prueba", { description: "get one user", data, });
            Notifier.emit({payload: data});

            res.json(data);
        } catch (error) {
            next(error);
        }
    },

    getUserList: async (req, res, next) => {
        try {
            const {filters, pagination} = req;

            const [total, data] = await Promise.all([getCount(filters), getUserList(filters, pagination)]);

            Notifier.emit({payload: data});
            // io.of('/tickets').emit('cosa-prueba', {data, aditional:'algo para comprobar'});

            res.json({total, data, pagination});
        } catch (error) {
            next(error);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const userDto = UserCreateDTO(req.body);

            const data = await createUser(userDto);

            res.json(data);
        } catch (error) {
            next(error);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {
                params: {id},
                body,
            } = req;

            const userDto = UserCreateDTO(body);

            const data = await updateUser(id, userDto);

            if (!data) {
                throw createError(400, {message: `Can not update the information`});
            }

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

            const data = await deleteUser(id);

            //   Notifier.socket.emit("cosa-prueba", {
            //     description: "delete user",
            //     data,
            //   });

            // if (!data) {
            //     throw createError(400, {message: 'Invalid information'});
            // }

            res.json(data);
        } catch (error) {
            next(error);
        }
    },
};
