const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now },
    image: {
        type: String,
        required: false,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "role"
      }
    ]
});
const User = mongoose.model('user', UserSchema);

module.exports = User