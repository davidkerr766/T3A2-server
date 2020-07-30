const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    // get all the blogs from the db
    Blog.find({}, (err, data) => {
      if (err) throw err;
      res.json(data);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/create", auth, (req, res) => {
  try {
    const { blogTitle, paragraphs } = req.body;

    // Validation
    if (!blogTitle || !paragraphs) {
      return res
        .status(400)
        .json({ error: "Blog must have a title and at least one paragraph" });
    }

    // create a new blog with the data from the req
    Blog.create({ blogTitle, paragraphs }, (err, doc) => {
      if (err) throw err;
      res.send({ data: doc, message: `${blogTitle} has been saved` });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, (req, res) => {
  try {
    const { _id } = req.body;

    // delete the blog that matches the id sent in req
    Blog.deleteOne({ _id }, (err) => {
      if (err) throw err;
      res.json({
        data: req.body,
        message: `${req.body.blogTitle} has been deleted`,
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/update", auth, (req, res) => {
  try {
    const { _id, blogTitle, paragraphs } = req.body;

    // Validation
    if (!blogTitle || !paragraphs) {
      return res
        .status(400)
        .json({ error: "Blog must have a title and at least one paragraph" });
    }

    // Overwrite the blog that matches the id sent in req with the body of req
    Blog.findByIdAndUpdate(_id, req.body, { overwrite: true }, (err) => {
      if (err) throw err;
      res.json({ message: `${req.body.blogTitle} has been updated` });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
