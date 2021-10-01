const express = require('express');
const api = require('./controllers/api/index');
const apiRouter = express.Router();
const upload = require('./middlewares/upload');

apiRouter.get('/', function (req, res) {
  res.send('Birds home page');
});

apiRouter.post('/upload', upload.single('image'), api.uploadImage);
apiRouter.get('/list', api.getList);
apiRouter.delete('/image/:id', api.deleteImage);
apiRouter.get('/image/:id', api.getImage);
apiRouter.get('/merge', api.merge);
module.exports = { apiRouter };
