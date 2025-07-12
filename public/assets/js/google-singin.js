/**
 * Google authentication
 */
function handleCredentialResponse(response) {
    const urlAuth = `${window.location.origin}/api/auth`;
    const id_token = response.credential;

    fetch(`${urlAuth}/google`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({id_token}),
    })
        .then((resp) => resp.json())
        .then(({user, token}) => {
            // localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
            location.href = '/web-chat/room';
        })
        .catch((error) => {
            console.log(error);
        });
}

// // sing-out google
// const signout = document.getElementById('google_sign_out');

// signout.addEventListener('click', () => {
//     console.log('google account: ', google);

//     google.accounts.id.disableAutoSelect();

//     google.accounts.id.revoke(localStorage.getItem('email'), (done) => {
//         localStorage.clear();
//         location.reload();
//         alert('the current session was closed');
//     });
// });
