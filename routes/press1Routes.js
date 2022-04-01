const express = require('express');
const router = express.Router();

const {
    getAllPress1,
    getPress1ById,
    removePress1 } = require('../controller/press1Controller');

//@desc Get all products from DB
//@route GET /api/products
//@access Public
router.get('/index', getAllPress1);
router.get('/:id', getPress1ById);
// router.put('/:id', updateEventById);
router.delete('/:id', removePress1);

module.exports = router;