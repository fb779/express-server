const TicketControl = require('../../class/tickets-control');

const ticketCtrl = new TicketControl();

module.exports = {
    TicketSocketController: (client, sk) => {
        // client.on('disconnect', () => {
        //     delete users[client.id];
        // });

        const totalTickets = () => {
            // TODO: emision cantidad total de tickets al socket
            sk.emit('total-ticket', ticketCtrl.tickets.length ? `${ticketCtrl.tickets.length}` : `Without Tickets...`);
        };

        const lastFour = () => {
            // TODO: emision de los ultimos cuatro al socket
            sk.emit('last-four', ticketCtrl.lastFour);
        };

        /**
         * Emisiones iniciales al conectarse un nuevo cliente
         */
        // TODO: emision del ultimo ticket creado
        client.emit('last-ticket', ticketCtrl.last ? `Ticket: ${ticketCtrl.last}` : `Without Tickets...`);

        totalTickets();

        lastFour();

        // TODO: event of new ticket
        client.on('tk-new', (payload, cb) => {
            const new_ticket = ticketCtrl.nextTicket();

            cb && cb(new_ticket);

            // TODO: Notificar la creacion de un nuevo ticket
            totalTickets();
        });

        // TODO: event of new ticket
        client.on('tk-next', (payload, cb) => {
            const {dsk = null} = payload;

            if (!dsk) {
                return cb && cb({ok: false, msg: `Desktop is required`});
            }

            const next_ticket = ticketCtrl.attend(dsk);

            if (!next_ticket) {
                cb && cb(Object.assign({}, {ticket: {number: 'NA', uid: 'NA'}}));
            } else {
                cb && cb(Object.assign({}, {ticket: next_ticket}));
            }

            // TODO: Notificar la creacion de un nuevo ticket
            totalTickets();

            // TODO: Notificar los ultimos cuatro tickets
            lastFour();
        });
    },
};
