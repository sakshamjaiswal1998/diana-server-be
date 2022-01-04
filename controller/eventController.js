const Event = require('../models/Event');
const multer  = require('multer')

const getUpcomingEvents = async(req, res) => {
    try {
        const events = await Event.find({});
        res.json(events);
    } catch (error) {
        console.log('ERR: getAllEvents', error);
        res.status(500).json({message: "Server error"})
    }
};


const getPastEvents = async(req, res) => {
    try {
        const events = await Event.find({});
        res.json(events);
    } catch (error) {
        console.log('ERR: getAllEvents', error);
        res.status(500).json({message: "Server error"})
    }
};

module.exports = {
    getUpcomingEvents,
    getPastEvents,
}