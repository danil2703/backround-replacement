const db = require('../../entities/Database');
const { NotFoundApiError } = require('../../validators/errors/ApiError');

module.exports = async (req, res, next) => {
  try {
    const imageId = req.params.id;
    const id = await db.remove(imageId);

    if (!id) {
      throw new NotFoundApiError('The picture was not found');
    }

    return res.json({ id });
  } catch (err) {
    return next(err);
  }
};
