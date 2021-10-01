const { replaceBackground } = require('backrem');
const path = require('path');
const fs = require('fs');
const { imageFolder } = require('../../config');

module.exports = async (req, res) => {
  const { front, back, color, threshold } = req.query;

  const catExample = fs.createReadStream(
    path.resolve(imageFolder, `${front}.jpg`)
  );

  const spaceExample = fs.createReadStream(
    path.resolve(imageFolder, `${back}.jpg`)
  );
  const merged = await replaceBackground(
    catExample,
    spaceExample,
    color.split(','),
    threshold
  );

  res.contentType('image/jpeg');

  merged.pipe(res);
};
