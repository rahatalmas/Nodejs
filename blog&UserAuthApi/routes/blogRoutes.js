const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/allblogs',blogController.getBlogs);
router.post('/postblog',blogController.writeBlog);
router.get('/:id',blogController.singleBlog);
router.delete('/:id',blogController.deleteBlog);

module.exports = router;