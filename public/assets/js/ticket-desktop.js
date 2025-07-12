const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('dsk')) {
    setTimeout(() => {
        window.location = '/ticket';
        throw new Error('Desktop is required');
    }, 2000);
}

const ticket_sk = io('/tickets');

const dsk = searchParams.get('dsk');
const lblDsk = document.querySelector('#lblDsk');
const lblTicketId = document.querySelector('#lblTicketId');
const lblTicketNo = document.querySelector('#lblTicketNo');
const lblErrorDesktop = document.querySelector('#lblErrorDesktop');

const lblTicketPending = document.querySelector('#lblTicketPending');
const btnNext = document.querySelector('button');

lblDsk.innerHTML = dsk;
lblTicketId.innerHTML = '';
lblTicketNo.innerHTML = '';
lblErrorDesktop.style.display = 'none';

btnNext.addEventListener('click', () => {
    btnNext.disabled = true;
    ticket_sk.emit('tk-next', {dsk}, (payload) => {
        if (Reflect.has(payload, 'ok') && !payload?.ok) {
            lblErrorDesktop.innerHTML = payload.msg;
            lblErrorDesktop.style.display = '';
            btnNext.disabled = false;
            return;
        }

        const {
            ticket: {uid = '--', number = '--'},
        } = payload;
        setTimeout(() => {
            lblTicketId.innerHTML = uid;
            lblTicketNo.innerHTML = number;
            btnNext.disabled = false;
        }, 500);
    });
});

ticket_sk.on('total-ticket', (payload) => {
    lblTicketPending.innerHTML = `Loading...`;
    setTimeout(() => {
        lblTicketPending.innerHTML = payload;
    }, 500);
});

ticket_sk.on('disconnect', () => {
    btnNext.disabled = true;
});

ticket_sk.on('connect', () => {
    btnNext.disabled = false;
});
