// server/routes/posts.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { createPost, editPost, getPosts, deletePost } = require('../controllers/postsController');

// Protected route to create a post
router.post('/', verifyToken,createPost);

// Protected route to update a post
router.put('/:id', verifyToken, editPost);

// Protected route to delete a post
router.delete('/:id', verifyToken, deletePost );

// Route to get all posts
router.get('/',verifyToken, getPosts);

module.exports = router;
