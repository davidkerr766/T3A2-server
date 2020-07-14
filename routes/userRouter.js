const express = require('express');
const router = express.Router();
const User = require('../models/User');


/* GET users listing. */
router.get('/', async (req, res) => {
  const users = await User.find()
  res.send(users);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required"})
  }
})

module.exports = router;
