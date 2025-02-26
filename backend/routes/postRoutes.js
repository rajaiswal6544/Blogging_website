const express = require('express');
const { createPost, getAllPosts, getPostById, updatePost, deletePost,getPostsByCategory } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/', authMiddleware, upload.single('image'), createPost);
router.get('/', getAllPosts);
router.get('/filter', getPostsByCategory);
router.get('/:id', getPostById);
router.put('/:id', authMiddleware, upload.single('image'), updatePost);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
