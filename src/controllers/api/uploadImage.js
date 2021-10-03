const db = require('../../entities/Database');
const Image = require('../../entities/Image');
const { BadRequestApiError } = require('../../validators/errors/ApiError');

module.exports = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new BadRequestApiError('The picture was not sent');
    }

    const image = new Image(
      req.file.filename.slice(0, -4),
      req.file.size,
      req.file.mimetype
    );

    await db.insert(image);
    res.statusCode = 201;
    return res.json({ id: image.id });
  } catch (err) {
    return next(err);
  }
};
