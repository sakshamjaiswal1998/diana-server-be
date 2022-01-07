const express = require('express');
const router = express.Router();

const { getAllProducts, getProductById, removeProduct, } = require('../controller/productController');

//@desc Get all products from DB
//@route GET /api/products
//@access Public
router.get('/index', getAllProducts);
router.get('/:id', getProductById);
// router.put('/:id', updateProductById);
router.delete('/:id', removeProduct);

module.exports = router;