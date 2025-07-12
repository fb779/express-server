const mongoose = require('mongoose');

const RoleModel = require('./../roles/role.model');

const {encryptPassword} = require('./../../helpers');

const {Schema, model} = mongoose;

const UserSchema = new Schema(
    {
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        image: {type: String, default: null},
        role: {type: Schema.Types.ObjectId, ref: 'Role', required: false},
        status: {type: Boolean, default: true},
        google: {type: Boolean, default: false},
    },
    {collection: 'users', timestamps: true, id: false, toObject: {virtuals: true}, toJSON: {virtuals: true}}
);

UserSchema.path('role').validate(async function (value) {
    const val = await RoleModel.findById(value);
    return !val ? false : true;
}, `{PATH} is invalid`);

/**
 * Hook to before to save user to encrypt password
 */
UserSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = encryptPassword(user.password);
    }
    return next();
});

UserSchema.pre('findOneAndUpdate', function (next) {
    const user = this.getUpdate();

    if (user.password) {
        user.password = encryptPassword(user.password);
    }

    return next();
});

/**
 * virtual fields
 */
UserSchema.virtual('uid').get(function () {
    return this._id.toString();
    // return this.id;
});

// UserSchema.virtual('role_name').get(async function () {
//     const role = await RoleModel.findById(this.role);
//     console.log(this.role);
//     return role.name;
// });

/**
 * static methods
 */
UserSchema.static('findByEmail', function (value) {
    return this.findOne({email: value});
});

/**
 * method of remove password to response
 */
UserSchema.methods.toJSON = function () {
    const {password, _id, id, status, __v, ...data} = this.toObject();

    return data;
};

module.exports = model('User', UserSchema);
