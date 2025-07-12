module.exports = {
    ProductCreateDTO: (body) => {
        // name, image, price, description, category, status, user;
        const {name, image, price, description, category} = body;
        return {name, image, price, description, category};
    },
};
