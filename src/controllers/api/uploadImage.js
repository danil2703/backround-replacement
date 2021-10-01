const db = require('../../entities/Database');
const Image = require('../../entities/Image');

module.exports = async (req, res) => {
  const image = new Image();

  await db.insert(image);
  return res.send('hello');
};
