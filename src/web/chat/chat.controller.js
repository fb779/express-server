const {
    google: {client_id},
} = require('../../../config/config');

module.exports = {
    chat_home: (req, res, next) => {
        const title = 'Chat Home';

        const scripts = ['google-singin.js', 'google-singout.js', 'chat-home.js'];
        // const scripts = ['google-singin.js', 'chat-home.js'];

        res.render(`chat/chat-home`, {title, scripts, client_id, layout: 'chat-main'});
    },

    chat_room: (req, res, next) => {
        const title = 'Chat Room';

        const styles = ['chat.css'];
        const scripts = ['chat-room.js'];

        res.render(`chat/chat-room`, {title, scripts, styles, layout: 'chat-main'});
    },
};
