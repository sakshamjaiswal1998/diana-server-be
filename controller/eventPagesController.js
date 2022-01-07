const Event = require('../models/Event');
const multer  = require('multer')
const moment  = require('moment')

const getUpcomingEvents = async(req, res) => {
    try {
        const events = await Event.find({startdate: {$gte: moment().format('YYYY-MM-DD')}});
        res.json(events);
    } catch (error) {
        console.log('ERR: getAllEvents', error);
        res.status(500).json({message: "Server error"})
    }
};


const getPastEvents = async(req, res) => {
    try {
        const events = await Event.find({startdate: {$lt: moment().format('YYYY-MM-DD')}});
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