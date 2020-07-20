const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.get('/', async (req, res) => {
    try {
    Blog.find({}, (err, data) => {
        if (err) throw err
        res.json(data)
    })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

module.exports = router