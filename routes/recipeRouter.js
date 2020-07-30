const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const auth = require("../middleware/auth");

router.post("/create", auth, (req, res) => {
  try {
    const {
      recipeTitle,
      serves,
      description,
      ingredients,
      methods,
      notes,
      getURL,
    } = req.body;

    // Validation
    if (!recipeTitle || !serves || !ingredients || !methods || !getURL) {
      return res
        .status(400)
        .json({ error: "All mandatory fields must be complete" });
    }

    // Save the new recipe in db
    Recipe.create(
      { recipeTitle, serves, description, ingredients, methods, notes, getURL },
      (err, doc) => {
        if (err) throw err;
        res.send({ data: doc, message: `${recipeTitle} has been saved` });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", (req, res) => {
  try {
    // get all the recipes in the db
    Recipe.find({}, (err, doc) => {
      if (err) throw err;
      res.json(doc);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, (req, res) => {
  try {
    const { _id } = req.body;
    // delete the recipe matching the id sent in req
    Recipe.deleteOne({ _id }, (err) => {
      if (err) throw err;
      res.json({
        data: req.body,
        message: `${req.body.recipeTitle} has been deleted`,
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/update", auth, (req, res) => {
  try {
    const { _id, recipeTitle, serves, ingredients, methods, getURL } = req.body;

    // Validation
    if (!recipeTitle || !serves || !ingredients || !methods || !getURL) {
      return res
        .status(400)
        .json({ error: "All mandatory fields must be complete" });
    }

    // Overwrite the recipe matching the id sent in req with the object in req.body
    Recipe.findByIdAndUpdate(_id, req.body, { overwrite: true }, (err) => {
      if (err) throw err;
      res.json({ message: `${req.body.recipeTitle} has been updated` });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
