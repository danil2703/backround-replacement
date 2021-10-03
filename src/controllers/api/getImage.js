const path = require('path');
const fs = require('fs');
const { imageFolder } = require('../../config');
const { NotFoundApiError } = require('../../validators/errors/ApiError');

module.exports = async (req, res, next) => {
  try {
    const imageId = req.params.id;

    const stream = fs.createReadStream(
      path.resolve(imageFolder, `${imageId}.jpg`)
    );

    stream.on('error', function () {
      next(new NotFoundApiError('The picture was not found'));
    });

    res.contentType('image/jpeg');
    stream.pipe(res);
  } catch (err) {
    next(err);
  }
};
