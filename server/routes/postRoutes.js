const postController = require('../controllers/postControllers')
const express = require('express')
const router = express.Router()

router.route('/').get(postController.getAllPosts).post(postController.createNewPost)

router.route('/:id').get(postController.getPostById);



module.exports = router