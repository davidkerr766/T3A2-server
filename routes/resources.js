const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASS}@cluster0.5w7cn.mongodb.net/dev?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to Atlas")
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String
})

const User = mongoose.model('User', userSchema)

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

module.exports = router;
