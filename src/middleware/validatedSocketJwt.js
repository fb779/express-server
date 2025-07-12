const {getUserById} = require('../apiModules/users/user.dao');
const {checkJWT} = require('../helpers');

const validateSoketJWT = async (token) => {
    try {
        const {uid} = await checkJWT(token);
        return await getUserById(uid);
    } catch (error) {
        console.log(`${error.message}`);
        return null;
    }
};

module.exports = {
    validSoketJWT: async (socket, next) => {
        // TODO: verificar el JWT
        const user = await validateSoketJWT(socket.handshake.headers?.headerToken);
        if (!user) {
            return socket.disconnect();
        }

        console.log('Hola mi querido socket');
        next();
    },
};
