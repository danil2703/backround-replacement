const path = require('path');
const { imageFolder } = require('../../config');

module.exports = async (req, res) => {
  const imageId = req.params.id;

  res.download(
    path.resolve(imageFolder, `${imageId}.jpg`),
    `${imageId}.jpg`,
    (err) => {
      if (err) {
        res.status(500).send({
          message: 'Could not download the file. ' + err,
        });
      }
    }
  );
};
