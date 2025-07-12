const {
    pagination: {DEFAULT_PAGE, DEFAULT_LIMIT},
} = require('../../config/config');

module.exports = {
    PaginationDTO: (query = {}) => {
        // page, limit;
        let {page = DEFAULT_PAGE, limit = DEFAULT_LIMIT} = query;

        page = isNaN(page) || Number(page) <= 0 ? DEFAULT_PAGE : Number(page);

        limit = isNaN(limit) || Number(limit) > 100 ? DEFAULT_LIMIT : Number(limit);

        return {page, limit};
    },
};
