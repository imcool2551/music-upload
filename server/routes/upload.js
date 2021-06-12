const util = require('util');
const express = require('express');
const router = express.Router();
const s3 = require('../config/aws-s3');

const { isLoggedIn } = require('../middlewares');

s3.getSignedUrl = util.promisify(s3.getSignedUrl);
router.use(isLoggedIn);

router.get('/api/upload/image', async (req, res, next) => {
  const { filename } = req.query;
  if (!filename) {
    return res.status(400).json({ message: '파일 이름을 명시해주세요' });
  }

  const key = `${decodeURIComponent(filename)}-${new Date().getTime()}`;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    ContentType: 'image/*',
    Expires: 5 * 60,
    Key: key,
  };

  try {
    const presignedUrl = await s3.getSignedUrl('putObject', params);
    res.json({ presignedUrl, path: encodeURIComponent(key) });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/api/upload/audio', async (req, res, next) => {
  const { filename } = req.query;
  if (!filename) {
    return res.status(400).json({ message: '파일 이름을 명시해주세요' });
  }

  const key = `${decodeURIComponent(filename)}-${new Date().getTime()}`;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    ContentType: 'audio/*',
    Expires: 5 * 60,
    Key: key,
  };

  try {
    const presignedUrl = await s3.getSignedUrl('putObject', params);
    res.json({ presignedUrl, path: encodeURIComponent(key) });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
