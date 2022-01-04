const express = require('express');
const router = express.Router();

const { 
    getUpcomingEvents,
    getPastEvents } = require('../controller/eventController');

//@desc Get all products from DB
//@route GET /api/products
//@access Public
router.get('/upcoming', getUpcomingEvents);
router.get('/past', getPastEvents);

module.exports = router;