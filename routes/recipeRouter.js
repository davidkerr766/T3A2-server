const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth')

router.post('/create', auth, async (req, res) => {
    try {
        const { recipeTitle, serves, description, ingredients, methods, notes } = req.body

        if (!recipeTitle || !serves || !ingredients || !methods) {
            return res.status(400).json({ error: "All mandatory fields must be complete"})
        }

        Recipe.create({recipeTitle, serves, description, ingredients, methods, notes}, (err, data) => {
            if (err) throw err
            res.send({data, message: "Recipe Successfully Saved"})
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/', async (req, res) => {
    try {
        Recipe.find({}, (err, data) => {
            if (err) throw err
            res.json(data)
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})
module.exports = router