const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const {
    generateGetUrl,
    generatePutUrl
  } = require('../awsS3')

router.get('/generate-get-url', auth, (req, res) => {
    // Both Key and ContentType are defined in the client side.
    // Key refers to the remote name of the file.
    const { Key } = req.query;
    generateGetUrl(Key)
    .then(getURL => {      
      res.send(getURL);
    })
    .catch(err => {
      res.send(err);
    });
})

router.get('/generate-put-url', auth, (req,res)=>{
    // Both Key and ContentType are defined in the client side.
    // Key refers to the remote name of the file.
    // ContentType refers to the MIME content type, in this case image/jpeg
    const { Key, ContentType } =  req.query;
    generatePutUrl(Key, ContentType).then(putURL => {
      res.send({putURL});
    })
    .catch(err => {
      res.send(err);
    });
  });

module.exports = router