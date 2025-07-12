const ticket_sk = io('/tickets');

ticket_sk.on('connect', () => {
    console.log(`conectado al servidor de tickets`);
});

ticket_sk.on('disconnect', () => {
    console.log(`desconectado del servidor de tickets`);
});

ticket_sk.on('cosa-prueba', (payload) => {
    console.log(`Prueba de carga`, payload);
});
