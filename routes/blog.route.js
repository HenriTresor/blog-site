const express = require('express')
const { addBlog, getSinglePost } = require('../controllers/blog.controller')
const router = express.Router()

router.post('/', addBlog)

router.get('/:id', getSinglePost)

module.exports = router