const self = (module.exports = {
    ...require('./google-verify'),
    ...require('./jwt.helper'),
    ...require('./normalize-port.helper'),
    ...require('./password.helper'),
    ...require('./validators.helper'),
});
