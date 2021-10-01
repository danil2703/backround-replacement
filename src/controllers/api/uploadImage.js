const db = require('../../entities/Database');
const Image = require('../../entities/Image');

module.exports = async (req, res) => {
  const image = new Image(
    req.file.filename.slice(0, -4),
    req.file.size,
    req.file.mimetype
  );

  await db.insert(image);

  return res.json(image.id);
};
