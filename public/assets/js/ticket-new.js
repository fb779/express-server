const ticket_sk = io('/tickets');

const lblNewTicket = document.querySelector('#lblNewTicket');
const BtnNewTicket = document.querySelector('button');

ticket_sk.on('connect', () => {
    BtnNewTicket.disabled = false;
});

ticket_sk.on('disconnect', () => {
    BtnNewTicket.disabled = true;
});

ticket_sk.on('last-ticket', (payload) => {
    lblNewTicket.innerHTML = payload;
});

BtnNewTicket.addEventListener('click', () => {
    ticket_sk.emit('tk-new', null, (payload) => {
        lblNewTicket.innerHTML = `Loading...`;
        setTimeout(() => {
            lblNewTicket.innerHTML = payload;
        }, 500);
    });
});
