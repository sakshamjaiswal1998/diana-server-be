const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
});
const Post = mongoose.model('press', PostSchema);

module.exports = Post