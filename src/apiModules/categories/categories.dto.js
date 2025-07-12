module.exports = {
    CategoryCreateDTO: (body) => {
        // name, image, status, user;
        const {name, image} = body;
        return {name, image};
    },
};
