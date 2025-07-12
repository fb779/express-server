// sing-out google
const signout = document.getElementById('google_sign_out');

if (signout) {
    signout.addEventListener('click', () => {
        console.log('google account: ', google);

        google.accounts.id.disableAutoSelect();

        google.accounts.id.revoke(localStorage.getItem('email'), (done) => {
            localStorage.clear();
            location.reload();
            alert('the current session was closed');
        });
    });
}
