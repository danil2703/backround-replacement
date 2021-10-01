const db = require('../../entities/Database');

module.exports = async (req, res, next) => {
  try {
    const imageId = req.params.id;
    const id = await db.remove(imageId);

    return res.json({ id });
  } catch (err) {
    return next(err);
  }
};
