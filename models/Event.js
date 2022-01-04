const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: false,
    },
    startdate: {
        type: String,
        required: false,
    },
    enddate: {
        type: String,
        required: false,
    },
    starttime: {
        type: String,
        required: false,
    },
    endtime: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    mapurl: {
        type: String,
        required: false,
    },
});

const Event = mongoose.model('event', EventSchema);
module.exports = Event