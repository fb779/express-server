const socket = io();

const led = document.querySelector('#led');
const message = document.querySelector('#message');
const send = document.querySelector('#send');

send.addEventListener('click', () => {
    console.log('evento de envio');
    const msg = message.value;

    const payload = {msg};

    socket.emit('send-message', payload, (resp) => {
        console.log('confirmacion desde el server: ', resp);
    });
    // socket.emit('send-message', payload);
});

/**
 * Socket client
 */

socket.on('connect', () => {
    console.log(`conectado al servidor`);
    led.style.color = 'green';
    message.removeAttribute('disabled');
    send.removeAttribute('disabled');
});

socket.on('disconnect', () => {
    console.log(`desconectado del servidor`);
    led.style.color = '';
    message.setAttribute('disabled', '');
    send.setAttribute('disabled', '');
});

// socket.on('connect_error', () => {
//     console.log('error al conectarce');

//     // setTimeout(() => {
//     //     socket.connect();
//     // }, 1000);
// });

socket.on('send-message', (payload) => {
    console.log('data de llegada del server', payload);
});
