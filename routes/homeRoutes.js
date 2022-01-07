const express = require('express');
const router = express.Router();

const { 
    getHome,
} = require('../controller/homeController');

//@desc Get all products from DB
//@route GET /api/products
//@access Public
router.get('/content', getHome);

module.exports = router;