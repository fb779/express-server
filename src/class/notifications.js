let instance = null;

module.exports = {
    setInstance: (socket = null) => {
        instance = !instance && socket ? socket : instance;
    },
    emit: ({payload, description = 'Notification center', user = null}) =>
        instance.emit('cosa-prueba', {
            description,
            data: payload,
        }),
};
