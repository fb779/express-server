module.exports = {
    ...require('./mongoose-validators.middleware'),
    ...require('./pagination.middleware'),
    ...require('./validateJWT.middleware'),
    ...require('./validateResult.middleware'),
    ...require('./validateRole.middleware'),
};
