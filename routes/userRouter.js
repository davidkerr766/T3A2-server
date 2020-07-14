const express = require('express');
const router = express.Router();
const User = require('../models/User');


/* GET users listing. */
router.get('/', async (req, res) => {
  const users = await User.find()
  res.send(users);
});


module.exports = router;
