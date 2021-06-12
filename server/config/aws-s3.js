const AWS = require('aws-sdk');

module.exports = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECREST_ACCESS_KEY,
  Bucket: process.env.AWS_BUCKET_NAME,
  signatureVersion: 'v4',
  region: 'ap-northeast-2',
});
