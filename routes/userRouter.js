const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find the user that matches the email
    const adminUser = await User.findOne({ email: email });
    if (!adminUser) {
      return res
        .status(400)
        .json({ error: "Email does not exist. Check email." });
    }

    // Compare the unencrypted password from the db with the login password
    const isMatch = await bcrypt.compare(password, adminUser.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Password is incorrect" });
    }

    // Generate a new jwt
    const token = jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: adminUser._id,
        email: adminUser.email,
      },
      message: "Successfully Logged In",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/change-password", auth, async (req, res) => {
  try {
    const { oldPass, newPass, newPass2 } = req.body;
    const user = await User.findById(req.user);

    // Validation
    if (!oldPass || !newPass || !newPass2) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (newPass != newPass2) {
      return res.status(400).json({ error: "New passwords must match" });
    }

    //check if password is valid
    const isMatch = await bcrypt.compare(oldPass, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Old password is incorrect" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newPass, salt);

    // Save new hashed password to db
    user.password = passwordHash;
    await user.save();

    return res.status(201).json({ message: "Password successfully changed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    // Check if there's a token
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    // Check if token is valid
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    // check there is a user in the db that matches the user id in the token
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get the user if a valid token is provided
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    id: user._id,
    email: user.email,
  });
});

module.exports = router;
