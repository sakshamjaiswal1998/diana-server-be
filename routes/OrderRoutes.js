const express = require('express');
const router = express.Router();

const { 
    getAllOrders,
    getOrderById,
    removeOrder } = require('../controller/orderController');

//@desc Get all products from DB
//@route GET /api/products
//@access Public
router.get('/index', getAllOrders);
router.get('/:id', getOrderById);
router.delete('/:id', removeOrder);

module.exports = router;