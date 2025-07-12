const {Router, request, response} = require('express');

const {home, ticket_new, ticket_screen, ticket_desktop} = require('./ticket.controller');

const router = new Router();

router.get('', home);
router.get('/new-ticket', ticket_new);
router.get('/screen', ticket_screen);
router.get('/desktop', ticket_desktop);

module.exports = router;
