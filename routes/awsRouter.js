const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { generatePutUrl } = require("../awsS3");

router.get("/generate-put-url", auth, (req, res) => {
  // get the name and type of file
  const { Key, ContentType } = req.query;

  // generate a pre-signed put url
  generatePutUrl(Key, ContentType)
    .then((putURL) => {
      res.send({ putURL });
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
