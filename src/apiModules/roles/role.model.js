const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const RoleSchema = new Schema(
    {
        name: {type: String, required: true, unique: true},
        status: {type: Boolean, default: false},
    },
    {collection: 'role', timestamps: true, id: false, toObject: {virtuals: true}, toJSON: {virtuals: true}}
);

/**
 * virtual fields
 */
RoleSchema.virtual('uid').get(function () {
    return this._id.toString();
});

/**
 * static methods
 */
RoleSchema.static('findByName', function (value) {
    return this.findOne({name: value});
});

RoleSchema.static('findMultiplyByName', function (value) {
    return this.find({name: {$in: value}});
});

/**
 * method of remove password to response
 */
RoleSchema.methods.toJSON = function () {
    const roleObject = this.toObject();

    const {_id, __v, ...data} = roleObject;

    return data;
};

module.exports = model('Role', RoleSchema);
