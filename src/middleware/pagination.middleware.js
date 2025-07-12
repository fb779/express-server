const {
    pagination: {DEFAULT_PAGE, DEFAULT_LIMIT},
} = require('../../config/config');

const {PaginationDTO} = require('../dto/pagination.dto');

module.exports = {
    checkPagination: (req, res, next) => {
        let {query} = req;

        req.pagination = PaginationDTO(query);

        next();
    },
};
