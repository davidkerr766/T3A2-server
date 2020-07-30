require("dotenv").config();
const AWS = require("aws-sdk");

// Configure aws with environment variables
AWS.config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.BUCKET_REGION,
});

const s3 = new AWS.S3();
const Bucket = process.env.BUCKET_NAME;

function generatePutUrl(Key, ContentType) {
  return new Promise((resolve, reject) => {
    const params = { Bucket, Key, ContentType };
    // generate the signed put url
    s3.getSignedUrl("putObject", params, function (err, url) {
      if (err) {
        reject(err);
      }
      resolve(url);
    });
  });
}

module.exports = { generatePutUrl };
