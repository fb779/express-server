const {TicketSocketController} = require('./tickets/ticket.socket');
const {ChatSocketController} = require('./chat/chat.socket');
const {NotificationSocketController} = require('./notification/notification.socket');
const {validSoketJWT} = require('../middleware/validatedSocketJwt');

const GenericControllerSk = (io) => {
    // const generic = io.of('/');
    const generic = io;
    generic.on('connection', (client) => {
        console.log('conectado al socket generico: ', client.id);

        client.on('disconnect', () => {
            console.log('desconectado del socket: ', client.id);
        });

        client.on('send-message', (payload, cb) => {
            payload = Object.assign(payload, {user_id: client.id});

            cb && cb(payload);

            client.broadcast.emit('send-message', payload);
        });
    });
};

const TicketControllerSk = (io) => {
    const ticketSK = io.of('/tickets');
    ticketSK.on('connection', (socket) => TicketSocketController(socket, ticketSK));
    // Notifier.setInstance(ticketSK);
};

const ChatControllerSk = (io) => {
    const chatSK = io.of('/chat');
    chatSK.on('connection', (socket) => ChatSocketController(socket, chatSK));
};

const NotificationControllerSk = (io) => {
    const notificationSK = io.of('/notification');
    // notificationSK.use(validSoketJWT);
    notificationSK.on('connection', (socket) => NotificationSocketController(socket, notificationSK));
};

module.exports = {
    LoadSockets: (io) => {
        GenericControllerSk(io);
        TicketControllerSk(io);
        ChatControllerSk(io);
        NotificationControllerSk(io);
    },
};
