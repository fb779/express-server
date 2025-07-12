const createError = require('http-errors');

const {isPasswordRigth, generateJWT, googleVerify} = require('./../../helpers');

const {getUserByEmail, createUser} = require('./../users/user.dao');

module.exports = {
    loginEmailPassword: async (email, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await getUserByEmail(email);

                // TODO: check user exist
                if (!user) {
                    return reject(createError(400, {message: 'User or Password was wrong - user'}));
                }

                // TODO: check user status trues
                if (!user.status) {
                    return reject(createError(400, {message: 'User or Password was wrong - status:false'}));
                }

                // TODO: compare password
                if (!isPasswordRigth(password, user.password)) {
                    return reject(createError(400, {message: 'User or Password was wrong - password'}));
                }

                // TODO: generate jwt
                const token = await generateJWT({uid: user.uid});

                return resolve({token, user});
            } catch (error) {
                return reject(error);
            }
        });
    },

    signInGoolgeAccount: (id_token) => {
        return new Promise(async (resolve, reject) => {
            try {
                const userDto = await googleVerify(id_token);

                let user = await getUserByEmail(userDto.email);

                // TODO: check user exist
                if (!user) {
                    user = await createUser(userDto);
                }

                // TODO: check user status trues
                if (!user.status) {
                    return reject(createError(401, {message: `User disabled, contact the admin`}));
                }

                // TODO: check user status true
                // if (!user.google) {
                //     return reject(createError(401, {message: `User disabled, contact the admin`}));
                // }

                // TODO: generate jwt
                const token = await generateJWT({uid: user.uid});

                resolve({token, user});
            } catch (error) {
                reject(error);
            }
        });
    },

    renewToken: (user) => {
        return new Promise(async (resolve, reject) => {
            try {
                // TODO: generate jwt
                const token = await generateJWT({uid: user.uid});

                resolve(token);
            } catch (error) {
                reject(error);
            }
        });
    },
};
