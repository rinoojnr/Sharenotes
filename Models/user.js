const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    userphone: {
        type: String,
        unique: true,
        required: true
    },
    useremail: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    userpassword: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('user',userSchema);