// name, image, price, decription, category, status, user;
const inputs = ['name', 'price', 'description', 'category', 'status'];

module.exports = {
    checkQueryFilters: (req, res, next) => {
        const {page, limit, ...query} = req.query;

        const filters = inputs.reduce((acc, input) => {
            if (query[input]) {
                acc[input] = query[input];

                if (['status'].includes(input)) {
                    acc[input] = query[input].toLowerCase() === 'true';
                }

                if (['name', 'description'].includes(input)) {
                    acc[input] = {$regex: `${query[input]}`};
                }

                if (['price'].includes(input) && !isNaN(query[input])) {
                    acc[input] = Number(query[input]);
                }
            }

            return acc;
        }, {});

        req.filters = Object.assign({}, filters);

        next();
    },
};
