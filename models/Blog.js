const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    body: String
})
  
const Blog = mongoose.model('Blog', blogSchema)

seedBlog = async () => {
    await Blog.deleteMany({})
    
    const blogs = [
        {
            title: "Protein",
            body: "You + protein = gains"
        },
        {
            title: "Carbs",
            body: "You + carbs = energy"
        }
    ]
    
    await Blog.insertMany(blogs, err => {
        if (err) console.log(err)
    })
}

seedBlog()




module.exports = Blog