const cleanLocalStorage = () => {
    localStorage.clear();
};

const login = () => {
    const urlAuth = `${window.location.origin}/api/auth`;
    const form = document.querySelector('form');

    form.addEventListener('submit', (ev) => {
        ev.preventDefault();

        const formData = {};

        for (let el of form.elements) {
            if (el.name.length > 0) formData[el.name] = el.value;
        }

        cleanLocalStorage();

        fetch(`${urlAuth}/login`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(formData),
        })
            .then(async (resp) => {
                if (!resp.ok) {
                    Promise.reject(Object.assign({}, {status: resp.status, statusText: resp.statusText}, await resp.json()));
                }
                return resp.json();
            })
            .then(({token}) => {
                localStorage.setItem('token', token);
                location.href = '/web-chat/room';
            })
            .catch((err) => {
                console.error(err);
            });
    });
};

login();
