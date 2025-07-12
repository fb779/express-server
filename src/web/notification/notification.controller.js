const {Require, response} = require('express');

const layout = 'notification-main';

module.exports = {
    home: (req = Require, res = response, next) => {
        const title = 'Notificaion System';

        const scripts = ['notification.js'];
        const styles = ['notification.css'];

        res.render(`notification/notif-home`, {title, styles, scripts, layout});
    },
};
