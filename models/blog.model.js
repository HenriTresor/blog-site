const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({

    post_header: {
        type: String,
        required: [true, "post header is required"]
    },
    username: {
        type: String,
        required: [true, "username is required"]
    },
    post_tag: {
        type: String,
        required: false,
        default: "none"
    },
    post_content: {
        type: String,
        required: [true, 'post content is required']
    },
    date: {
        type: Date,
        default:Date.now()
    }
})


const blogModel = mongoose.model("blogs", blogSchema)
module.exports = blogModel