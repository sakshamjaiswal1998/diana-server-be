const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String
    }
});
const User = mongoose.model('useremail', UserSchema);

module.exports = User