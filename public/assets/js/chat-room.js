let user = null;

const listUsers = document.querySelector('#listUsers');
const msg = document.querySelector('#msg');
const message = document.querySelector('#message');

const checkLoginUser = () => {
    const token = localStorage.getItem('token');
    const urlAuth = `${window.location.origin}/api/auth`;

    fetch(urlAuth, {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token,
        },
        method: 'GET',
    })
        .then(async (resp) => {
            if (!resp.ok) {
                Promise.reject(Object.assign({}, {status: resp.status, statusText: resp.statusText}, await resp.json()));
            }
            return resp.json();
        })
        .then(({user: usDb, token}) => {
            // localStorage.setItem('user', JSON.stringify(user));
            user = usDb;
            localStorage.setItem('token', token);
            document.title = `${document.title} - ${user.first_name} ${user.last_name}`;
        })
        .catch((err) => {
            console.log(err);
            localStorage.clear();
            location.href = '/web-chat';
        });
};

const connectSocket = () => {
    /**
     * Socket client
     */
    const token = localStorage.getItem('token');

    const socket = io('/chat', {
        extraHeaders: {
            'x-token': token,
        },
    });

    socket.on('connect', () => {
        console.log(`conectado al servidor`);
    });

    socket.on('disconnect', () => {
        console.log(`desconectado del servidor`);
    });

    socket.on('chat-users-enable', drawUsers);

    socket.on('chat-list-messages', drawMessages);

    /**
     * Events of html
     */
    message.addEventListener('keyup', (ev) => {
        if (ev.keyCode === 13) {
            const message = ev.target.value.trim();
            const to = null;
            socket.emit('send-message', {message, to});
            ev.target.value = '';
        }
    });
};

const drawMessages = (ltMessages = []) => {
    console.log('llegada de los mensajes', ltMessages);
    var options = {year: 'numeric', month: 'long', day: 'numeric'};

    let msgHtml = '';

    for (const el of ltMessages) {
        const date = new Date(el.date);
        msgHtml += `
            <div class="alert alert-info" role="alert">
                <p>${el.message}</p>
                <hr>
                <p>
                    <label class="text-success">
                        ${el.name}
                    </label>
                    <span class="text-dark text-opacity-50">
                        ${date.toLocaleString('en-US', options)}
                    </span>
                </p>
            </div>
        `;
    }

    msg.innerHTML = msgHtml;
};

const drawUsers = (ltUsers = []) => {
    console.log('Llegada de los usuarios', ltUsers);
    let liItems = '';

    ltUsers.forEach(({image, uid, first_name, last_name}) => {
        liItems += `
            <li class='list-group-item profile'>
                <!-- <div class='pr-image '>
                    <img src='${!image ? '...' : image}' class='img-fluid' alt='' />
                </div> -->
                <div class='pr-data'>
                    <span class="text-success text-uppercase">${first_name} ${last_name}</span>
                    <span class="text-muted">${uid}</span>
                </div>
            </li>
        `;
    });

    listUsers.innerHTML = liItems;
};

const init = async () => {
    checkLoginUser();
    connectSocket();
};

init();
