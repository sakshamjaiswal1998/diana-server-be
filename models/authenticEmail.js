const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String
    }
});
const AuthMail = mongoose.model('useremail', UserSchema);

module.exports = AuthMail