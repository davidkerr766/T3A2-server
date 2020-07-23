const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    blogTitle: { type: String, required: true },
    paragraphs: [{ heading: String, content: String }]
})
  
const Blog = mongoose.model('Blog', blogSchema)


module.exports = Blog