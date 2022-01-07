const mongoose = require('mongoose');

const FeaturedSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    // price: {
    //     type: Number,
    //     required: true,
    // },
    paint: {
        type: String,
        required: true,
    },
    medium: {
        type: String,
        required: true,
    },
    framed: {
        type: String,
        required: true,
    },
    width: {
        type: String,
        required: true,
    },
    height: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
});

const Featured = mongoose.model('featured', FeaturedSchema);
module.exports = Featured