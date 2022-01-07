const express = require('express');
const router = express.Router();

const { 
    getAllPosts,
    getPostById,
    removePost } = require('../controller/postController');

//@desc Get all products from DB
//@route GET /api/products
//@access Public
router.get('/index', getAllPosts);
router.get('/:id', getPostById);
// router.put('/:id', updatePostById);
router.delete('/:id', removePost);

module.exports = router;