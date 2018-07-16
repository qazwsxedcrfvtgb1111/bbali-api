const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pointSchema = require('./pointSchema');

const userSchema = new Schema({
    email: {type: String, unique: true},
    phone: {type: String, unique: true},
    fullName: String,
    password: String,
    registerLocation: pointSchema,
    loginLocations: [pointSchema],
    emailResetToken: {type: String},
    token: {type: String, unique: true},
    language: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
