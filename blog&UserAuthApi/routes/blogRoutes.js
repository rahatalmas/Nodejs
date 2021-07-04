const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/allblogs',blogController.getBlogs);
router.post('/postblog',blogController.writeBlog);
router.get('/singleblog/:id',blogController.singleBlog);
router.delete('/deleteblog/:id',blogController.deleteBlog);
router.put('/updateblog/:id',blogController.updateblog);

module.exports = router;