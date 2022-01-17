const express = require('express');
const router = express.Router();

const { 
    getAllUsers,
    getUserById,
    removeUser } = require('../controller/userController');

//@desc Get all products from DB
//@route GET /api/products
//@access Public
router.get('/index', getAllUsers);
router.get('/:id', getUserById);
// router.put('/:id', updateUserById);
router.delete('/:id', removeUser);

module.exports = router;