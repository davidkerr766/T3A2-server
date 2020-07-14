const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Blog = require('../models/Blog');


mongoose.connect(`mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASS}@cluster0.5w7cn.mongodb.net/dev?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to Atlas")
});

const Admin = new User({
  email: "test@test.com",
  password: "123456"
})

// Admin.save(err => {
//   if (err) return console.error(err)
//   console.log("User saved to atlas")
// })

/* GET users listing. */
router.get('/', async (req, res) => {
  users = await User.find()
  res.send(users);
});

router.get('/blogs', async (req, res) => {
  blogs = await Blog.find()
  res.send(blogs);
});

module.exports = router;
