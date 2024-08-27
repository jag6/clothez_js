const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },
    isAdmin: { type: String, required: true, default: false },
    hash: String,
    salt: String
});

//set salt and hash for password
userSchema.methods.setPassword = function(password) {
    //create unique salt for each user
    this.salt = crypto.randomBytes(16).toString('hex');
    //hash salt and password
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

//check if password is correct
userSchema.methods.validPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

module.exports = mongoose.model('User', userSchema);