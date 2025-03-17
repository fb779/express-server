const {Socket} = require('socket.io');
const {checkJWT} = require('../../helpers');

const {getUserById} = require('../../apiModules/users/user.dao');

const {
    secret: {headerToken},
} = require('../../../config/config');

const validateSoketJWT = async (token) => {
    try {
        const {uid} = await checkJWT(token);
        return await getUserById(uid);
    } catch (error) {
        console.log(`${error.message}`);
        return null;
    }
};

class NotificationMessage {
    constructor(id, message, from, to) {
        this.id = id;
        this.message = message;
        this.from = from;
        this.to = to;
    }
}

module.exports = {
    NotificationSocketController: async (client = new Socket(), sk) => {
        // TODO: verificar el JWT
        // const user = await validateSoketJWT(client.handshake.headers[headerToken]);
        // if (!user) {
        //     return client.disconnect();
        // }

        client.on('disconnect', () => {
            console.log(`User discconected: ${client.id}`);
        });

        // const emmitNotificaion = (notify) => {
        //     sk.emit('notification', {payload: notify});
        // };

        // const totalTickets = () => {
        //     // TODO: emision cantidad total de tickets al socket
        //     sk.emit('total-ticket', ticketCtrl.tickets.length ? `${ticketCtrl.tickets.length}` : `Without Tickets...`);
        // };

        client.on('send-notification', (payload) => {
            // console.log(`cliente dejando la conexion: ${client.id}`);
            console.log(`cliente dejando la conexion: ${payload.message}`);
            client.disconnect();
        });

        // client.on('leave', () => {
        //     console.log(`cliente dejando la conexion: ${client.id}`);
        //     client.disconnect();
        // });
        // client.on('reconnect', () => {
        //     console.log(`cliente dejando la conexion: ${client.id}`);
        // });
        // console.log(`Cliente conectado: ${client.id} - user: ${user.first_name}`);
    },
};
