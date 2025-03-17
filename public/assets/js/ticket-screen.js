const ticket_sk = io('/tickets');

const lblTickets = document.querySelector('#lblTickets');
const lblTicket1 = document.querySelector('#lblTicket1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');
const lblTicket2 = document.querySelector('#lblTicket2');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');
const lblTicket3 = document.querySelector('#lblTicket3');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');
const lblTicket4 = document.querySelector('#lblTicket4');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');

// ticket_sk.on('connect', () => {
//     console.log(`conectado al servidor de tickets`);
// });

// ticket_sk.on('disconnect', () => {
//     console.log(`desconectado del servidor de tickets`);
// });

ticket_sk.on('total-ticket', (payload) => {
    console.log(`Cantidad de tickets pendientes - ${payload}`);
    let text = payload;

    if (!isNaN(payload)) {
        text = `Tickets pendientes: ${payload}.`;
    }

    lblTickets.innerHTML = text;
});

ticket_sk.on('last-four', (payload) => {
    const [tk1, tk2, tk3, tk4] = payload;
    const title = 'Ticket';
    const desk = 'Desktop';

    if (tk1) {
        lblTicket1.innerHTML = `${title}: ${tk1.number}`;
        lblEscritorio1.innerHTML = `${desk}: ${tk1.desktop}`;
    }

    if (tk2) {
        lblTicket2.innerHTML = `${title}: ${tk2.number}`;
        lblEscritorio2.innerHTML = `${desk}: ${tk2.desktop}`;
    }

    if (tk3) {
        lblTicket3.innerHTML = `${title}: ${tk3.number}`;
        lblEscritorio3.innerHTML = `${desk}: ${tk3.desktop}`;
    }

    if (tk4) {
        lblTicket4.innerHTML = `${title}: ${tk4.number}`;
        lblEscritorio4.innerHTML = `${desk}: ${tk4.desktop}`;
    }
});
