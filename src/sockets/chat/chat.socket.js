const {Socket} = require('socket.io');

const {
    secret: {headerToken},
} = require('../../../config/config');

const {checkJWT} = require('../../helpers/jwt.helper');

const {getUserById} = require('../../apiModules/users/user.dao');

const ChatControl = require('../../class/chat-control');

const chatControl = new ChatControl();

const validateSoketJWT = async (token) => {
    try {
        const {uid} = await checkJWT(token);
        return await getUserById(uid);
    } catch (error) {
        return error;
    }
};

module.exports = {
    ChatSocketController: async (client = new Socket(), sk) => {
        const emitListUsers = () => {
            sk.emit('chat-users-enable', chatControl.listUsers);
        };

        const emitListMessages = () => {
            sk.emit('chat-list-messages', chatControl.lastTenMessages);
        };
        // TODO: verificar el JWT
        const user = await validateSoketJWT(client.handshake.headers[headerToken]);

        if (!user) {
            return client.disconnect();
        }

        console.log(`Cliente conectado: ${client.id} - user: ${user.first_name}`);

        chatControl.addUser(user, client.id);
        // TODO: Conectarce a su propia sala privada
        client.join(user.uid);

        emitListUsers();

        client.on('send-message', ({message, to = null}, cb) => {
            chatControl.addMessage(user.uid, user.first_name, message, to);
            // cb && cb(true);
            emitListMessages();
        });

        client.on('disconnect', () => {
            client.leave(user.uid);
            chatControl.removeUser(user.uid);
            emitListUsers();
        });
    },
};
