const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth')

router.post('/create', auth, (req, res) => {
    try {
        const { recipeTitle, serves, description, ingredients, methods, notes } = req.body

        if (!recipeTitle || !serves || !ingredients || !methods) {
            return res.status(400).json({ error: "All mandatory fields must be complete"})
        }

        Recipe.create({recipeTitle, serves, description, ingredients, methods, notes}, (err, doc) => {
            if (err) throw err
            res.send({ data: doc, message: `${recipeTitle} has been saved`})
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/', (req, res) => {
    try {
        Recipe.find({}, (err, doc) => {
            if (err) throw err
            res.json(doc)
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.delete('/delete', auth, (req, res) => {
    try {
        const { _id } = req.body
        Recipe.deleteOne({_id}, err => {
            if (err) throw err
            res.json({data: req.body, message: `${req.body.recipeTitle} has been deleted`})
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.put('/update', auth, (req, res) => {
    try {
        const { _id, recipeTitle, serves, ingredients, methods } = req.body
        if (!recipeTitle || !serves || !ingredients || !methods) {
            return res.status(400).json({ error: "All mandatory fields must be complete"})
        }
        
        Recipe.findByIdAndUpdate(_id, req.body, {overwrite: true}, err => {
            if (err) throw err
            res.json({ message: `${req.body.recipeTitle} has been updated`})
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router