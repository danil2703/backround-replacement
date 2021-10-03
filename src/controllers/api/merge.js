const { replaceBackground } = require('backrem');
const path = require('path');
const fs = require('fs');
const { imageFolder } = require('../../config');
const { BadRequestApiError } = require('../../validators/errors/ApiError');

module.exports = async (req, res, next) => {
  try {
    const { front, back, color, threshold } = req.query;

    if (!front || !back || !color || !threshold) {
      throw new BadRequestApiError('Bad request');
    }

    const frontStream = fs.createReadStream(
      path.resolve(imageFolder, `${front}.jpg`)
    );

    const backStream = fs.createReadStream(
      path.resolve(imageFolder, `${back}.jpg`)
    );

    const merged = await replaceBackground(
      frontStream,
      backStream,
      color.split(','),
      threshold
    );

    res.contentType('image/jpeg');
    merged.pipe(res);
  } catch (err) {
    next(err);
  }
};
