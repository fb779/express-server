module.exports = {
    RoleCreateDTO: (body) => {
        // first_name, last_name, email, password, image, role, status, google;
        const {name, status} = body;
        return {name, status};
    },
};
