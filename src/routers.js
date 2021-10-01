const express = require('express');
const api = require('./controllers/api/index');
const apiRouter = express.Router();
const upload = require('./middlewares/upload');

apiRouter.get('/', function (req, res) {
  res.send('Birds home page');
});

apiRouter.post('/upload', upload.single('file'), api.uploadImage);

module.exports = { apiRouter };
