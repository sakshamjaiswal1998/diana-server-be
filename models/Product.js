const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
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
    galleryimages: [{
        path: String
    }]
});

const Product = mongoose.model('product', ProductSchema);
module.exports = Product