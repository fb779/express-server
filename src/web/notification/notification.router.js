const {Router} = require('express');
const {home} = require('./notification.controller');
const router = Router();

router.get('', home);

module.exports = router;
