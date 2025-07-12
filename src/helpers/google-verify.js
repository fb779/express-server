const {OAuth2Client} = require('google-auth-library');

const {
    google: {client_id: CLIENT_ID},
} = require('./../../config/config');

const client = new OAuth2Client(CLIENT_ID);

const {UserCreateDTO} = require('./../apiModules/users/user.dto');

module.exports = {
    googleVerify: async function verify(token = null) {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
            // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });

        const {given_name: first_name, family_name: last_name, picture: img, email} = ticket.getPayload();

        return UserCreateDTO(Object.assign({}, {first_name, last_name, img, email, password: ':P', google: true, status: true}));
    },
};

// verify().catch(console.error);
