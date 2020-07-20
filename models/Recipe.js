const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    recipeTitle: { type: String, required: true },
    serves: { type: String, required: true },
    description: { type: String },
    ingredients: [{ type: String, required: true }],
    methods: [{ type: String, required: true }],
    notes: { type: String }
})
  
const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe