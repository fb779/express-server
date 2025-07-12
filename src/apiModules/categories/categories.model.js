const mongoose = require('mongoose');

const UserModel = require('./../users/user.model');

const {Schema, model} = mongoose;

const CategorySchema = new Schema(
    {
        name: {type: String, required: true, unique: true, uppercase: true},
        image: {type: String, default: null},
        status: {type: Boolean, default: false, required: true},
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    },
    {collection: 'categories', timestamps: true, id: false, toObject: {virtuals: true}, toJSON: {virtuals: true}}
);

CategorySchema.path('user').validate(async function (value) {
    const val = await UserModel.findById(value);
    return !val ? false : true;
}, `{PATH} is invalid`);

/**
 * Hook to before to save user to encrypt password
 */
// CategorySchema.pre('save', function (next) {
//     const user = this;
//     return next();
// });

// CategorySchema.pre('findOneAndUpdate', function (next) {
//     const user = this.getUpdate();
//     return next();
// });

/**
 * virtual fields
 */
CategorySchema.virtual('uid').get(function () {
    return this._id.toString();
});

CategorySchema.virtual('slug').get(function () {
    return this.name.toLowerCase().split(' ').join('-');
});

// UserSchema.virtual('role_name').get(async function () {
//     const role = await RoleModel.findById(this.role);
//     console.log(this.role);
//     return role.name;
// });

/**
 * static methods
 */
CategorySchema.static('findByName', function (value) {
    return this.findOne({name: value});
});

/**
 * method of remove password to response
 */
CategorySchema.methods.toJSON = function () {
    const {_id, id, __v, ...data} = this.toObject();

    return data;
};

module.exports = model('Category', CategorySchema);
