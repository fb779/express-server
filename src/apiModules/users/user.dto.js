module.exports = {
    UserCreateDTO: (body) => {
        // first_name, last_name, email, password, image, role, status, google;
        const {first_name, last_name, email, password, image, role, status, google} = body;
        return {first_name, last_name, email, password, image, role, status, google};
    },
};
