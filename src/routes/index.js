const {Router} = require('express');

const router = Router();

router.use('/', require('./web/index'));

router.use('/api', require('./api/index'));

module.exports = router;
