const express = require('express');
const router = express.Router();

const {
    getAllPress, getPressById, removePress } = require('../controller/pressController');

//@desc Get all products from DB
//@route GET /api/products
//@access Public
router.get('/index', getAllPress);
router.get('/:id', getPressById);
// router.put('/:id', updatePostById);
router.delete('/:id', removePress);

module.exports = router;