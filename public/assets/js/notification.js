const statusElement = document.getElementById('status');
const disconnectBtn = document.querySelector('#disconnect');
const sendBtn = document.querySelector('[type="button"]');
const sendInput = document.querySelector('input');

const connectSocket = () => {
    /**
     * Socket client
     */
    // const token = localStorage.getItem('token');

    const socket = io('/notification', {
        // extraHeaders: {
        //     'x-token': token,
        // },
    });

    socket.on('connect', () => {
        console.log(`conectado al servidor`);
        statusElement.classList.remove('off');
        statusElement.classList.add('on');
        statusElement.innerHTML = 'on';
    });

    socket.on('disconnect', (reason) => {
        console.log(`desconectado del servidor, ${reason}`);
        statusElement.innerHTML = 'off';
        statusElement.classList.remove('on');
        statusElement.classList.add('off');
    });

    socket.on('send-notification', drawNotification);

    // socket.on('chat-list-messages', drawMessages);

    /**
     * Events of html
     */
    // message.addEventListener('keyup', (ev) => {
    //     if (ev.keyCode === 13) {
    //         const message = ev.target.value.trim();
    //         const to = null;
    //         socket.emit('send-message', {message, to});
    //         ev.target.value = '';
    //     }
    // });

    sendBtn.onclick = (ev) => {
        ev.preventDefault();
        // const input = document.getElementByName('message');
        console.log(`valor del input: ${sendInput.value ?? sendInput.value}`);
        const payload = {message: sendInput.value ?? sendInput.value};
        socket.emit('send-notification', payload, (dt) => {
            console.log(`llegada del cb`, dt);
            drawNotification(dt.message);
        });
    };

    disconnectBtn.onclick = (ev) => {
        console.log(`me hicieron click`);
        socket.emit('leave');
    };
};

const drawNotification = (payload) => {
    alert(payload);
};

const init = async () => {
    connectSocket();
};

init();
