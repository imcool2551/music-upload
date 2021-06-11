const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middlewares');
const { Album, Song } = require('../db/models');

router.use(isLoggedIn);

router.post('/api/album', (req, res, next) => {
  console.log(req.body);
  res.send('Hello World');
});

module.exports = router;
