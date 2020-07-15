const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')



// POST Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    // validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required"})
    }

    const adminUser = await User.findOne({ email: email })
    if (!adminUser) {
      return res.status(400).json({ error: "Email does not exist. Check email."})
    } 

    const isMatch = await bcrypt.compare(password, adminUser.password)
    if (!isMatch) {
      return res.status(400).json({ error: "Password is incorrect"})
    }

    const token = jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET)

    res.json({
      token,
      user: {
        id: adminUser._id,
        email: adminUser.email
      }
    })

  } catch (err) {
      res.status(500).json({ error: err.message })
  }
})

// POST Change Password
router.post("/changepassword", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required"})
  }

  // Validate if password is correct


  // Hash new password
  const salt = await bcrypt.genSalt()
  const passwordHash = await bcrypt.hash(password, salt)

})

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token")
    if (!token) return res.json(false)

    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (!verified) return res.json(false)

    const user = await User.findById(verified.id)
    if (!user) return res.json(false)

    return res.json(true)
  } catch (err) {
      res.status(500).json({ error: err.message })
  }
})

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user)
  res.json({
    id: user._id,
    email: user.email
  })
})

module.exports = router;