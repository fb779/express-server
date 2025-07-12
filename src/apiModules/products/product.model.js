const mongoose = require('mongoose');
const UserModel = require('./../users/user.model');
const CategoryModel = require('./../categories/categories.model');

const {Schema, model} = mongoose;

const ProductSchema = new Schema(
    {
        name: {type: String, required: true, unique: true},
        image: {type: String, default: null},
        price: {type: Number, default: 0},
        description: {type: String, default: ''},
        category: [{type: Schema.Types.ObjectId, ref: 'Category', required: true}],
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        status: {type: Boolean, default: false, required: true},
    },
    {collection: 'products', timestamps: true, id: false, toObject: {virtuals: true}, toJSON: {virtuals: true}}
);

ProductSchema.path('user').validate(async function (value) {
    const val = await UserModel.findById(value);
    return !val ? false : true;
}, `{PATH} is invalid`);

ProductSchema.path('category').validate(async function (value) {
    // const val = await CategoryModel.find({_id: {$in: value}});
    // return !val ? false : true;
    return true;
}, `{PATH} is invalid`);

/**
 * Hook to before to save user to encrypt password
 */
// ProductSchema.pre('save', function (next) {
//     const obj = this;
//     return next();
// });

// ProductSchema.pre('findOneAndUpdate', function (next) {
//     const obj = this.getUpdate();
//     return next();
// });

/**
 * virtual fields
 */
ProductSchema.virtual('uid').get(function () {
    return this._id.toString();
});

ProductSchema.virtual('title').get(function () {
    return this.name.toUpperCase();
});

/**
 * static methods
 */
ProductSchema.static('findByName', function (value) {
    return this.findOne({name: value});
});

/**
 * method of remove password to response
 */
ProductSchema.methods.toJSON = function () {
    const {_id, id, __v, ...data} = this.toObject();

    return data;
};

module.exports = model('Product', ProductSchema);
