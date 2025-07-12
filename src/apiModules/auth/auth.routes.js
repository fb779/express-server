const {Router} = require('express');

// const {validateJWT} = require('../../middleware');
const {LoginValidate, GoogleLoginValidate} = require('./validators/auth.validator');
const {userValidateCreate} = require('../users/validators/user.validator');
const {login, googleSignIn, renewToken, createAdminUser} = require('./auth.controller');

const router = Router();

router.post('/login', LoginValidate, login);
router.post('/google', GoogleLoginValidate, googleSignIn);
router.post('/singin', createAdminUser);
// router.get('', validateJWT, renewToken);
// router.post('/logout', ()=>{});

module.exports = router;
