const express = require('express');
const router = express.Router();

const { 
    getAllPosts,
    getPostById,
    createPost,
    updatePostById,
    removePost } = require('../controller/postController');

//@desc Get all products from DB
//@route GET /api/products
//@access Public
router.get('/', getAllPosts);
router.get('/:id', getPostById);
// // router.put('/:id', updateProductById);
// router.delete('/:id', removeProduct);

module.exports = router;