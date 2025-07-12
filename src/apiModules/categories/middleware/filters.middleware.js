// first_name, last_name, email, password, image, role, status, google;
const inputs = ['name', 'status'];

module.exports = {
    checkQueryFilters: (req, res, next) => {
        const {page, limit, ...query} = req.query;

        const filters = inputs.reduce((acc, input) => {
            if (query[input]) {
                acc[input] = query[input];

                if (['status'].includes(input)) {
                    acc[input] = query[input].toLowerCase() === 'true';
                }

                if (['name', 'slug'].includes(input)) {
                    acc[input] = {$regex: `${query[input]}`};
                }
            }

            return acc;
        }, {});

        req.filters = Object.assign({}, filters);

        next();
    },
};
