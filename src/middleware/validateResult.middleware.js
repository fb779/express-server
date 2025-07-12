const {validationResult} = require('express-validator');

module.exports = {
    validateResult: (req, res, next) => {
        try {
            validationResult(req).throw();
            return next();
        } catch (error) {
            // res.status(400).json({errors: error.array()});
            res.status(400).json({errors: error.mapped()});
        }
    },
};
