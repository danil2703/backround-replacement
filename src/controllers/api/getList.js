const db = require('../../entities/Database');

module.exports = (req, res) => {
  const allImages = db.getAllImages().map((images) => images.toJSON());

  return res.json(allImages);
};
