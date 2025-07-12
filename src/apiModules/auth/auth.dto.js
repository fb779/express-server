module.exports = {
    AuthUserDTO: (body) => {
        // email, password
        const {email, password} = body;
        return {email, password};
    },
};
