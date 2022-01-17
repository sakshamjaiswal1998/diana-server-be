const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});
const Role = mongoose.model('role', RoleSchema);

module.exports = Role