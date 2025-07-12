// first_name, last_name, email, password, image, role, status, google;
const inputs = ['first_name', 'last_name', 'email', 'role', 'status', 'google'];

module.exports = {
    checkQueryFilters: (req, res, next) => {
        const {page, limit, ...query} = req.query;

        const filters = inputs.reduce((acc, input) => {
            if (query[input]) {
                acc[input] = query[input];

                if (['status', 'google'].includes(input)) {
                    acc[input] = query[input].toLowerCase() === 'true';
                }

                if (['first_name', 'last_name', 'email'].includes(input)) {
                    acc[input] = {$regex: `${query[input]}`};
                }
            }

            return acc;
        }, {});

        req.filters = Object.assign({status: true}, filters);

        next();
    },
};
