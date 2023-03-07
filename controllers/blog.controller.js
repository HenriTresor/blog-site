// add blog post

const Blog = require('../models/blog.model')

const addBlog = async (req, res) => {
    try {
        console.log(req.body);
        let { post_header, username, post_tag, post_content } = req.body
        
        if (!post_header || !username || !post_content) {
            return res.status(400).json({message:"please enter all the required fields (indicated by *)"})
        }

        let newBlog = new Blog({
            post_header,
            username,
            post_tag,
            post_content
        })

        await newBlog.save()
        if (newBlog) {
            return res.status(201).json({message:"new blog post created successfully"})
        }
        else {
            return res.sendStatus(404)
       }
    } catch (err) {
        res.status(500).json({message:"something happened on our end", err:err.message})
    }
}


const getAllPosts = async (req, res) => {
    try {
        let allPosts = await Blog.find()
        if (allPosts) {
            return res.status(200).json(allPosts)
        }
    } catch (err) {
        res.sendStatus(500)
    }
}


const getSinglePost = async (req, res) => {
    try {
        let singlePost = await Blog.findById({ _id: req.params.id })
        if (singlePost != "") {
            return res.status(200).render('single.blog.ejs', { blog: singlePost })
        }
        return res.sendStatus(404)
    } catch (err) {
        res.sendStatus(500)
    }
}

module.exports = {
    addBlog,
    getAllPosts,
    getSinglePost
}