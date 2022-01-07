const express = require('express');
const router = express.Router();

const { 
    getAllEvents,
    getEventById,
    removeEvent } = require('../controller/eventController');

//@desc Get all products from DB
//@route GET /api/products
//@access Public
router.get('/index', getAllEvents);
router.get('/:id', getEventById);
// router.put('/:id', updateEventById);
router.delete('/:id', removeEvent);

module.exports = router;