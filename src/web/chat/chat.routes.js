const {Router} = require('express');

const {chat_home, chat_room} = require('./chat.controller');

// const {
//     google: {client_id},
// } = require('../../../config/config');

const router = Router();

router.get('', chat_home);

router.get('/room', chat_room);

module.exports = router;
