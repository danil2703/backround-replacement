const EventEmitter = require('events');
const { writeFile } = require('../utils/fs');
const { existsSync } = require('fs');
const { dbDumpFile } = require('../config');
const { prettifyJsonToString } = require('../utils/prettifyJsonToString');
const Image = require('./Image');
class Database extends EventEmitter {
  constructor() {
    super();
    this.idToImage = {};
  }

  async initFromDump() {
    if (existsSync(dbDumpFile) === false) {
      return;
    }

    const dump = require(dbDumpFile);

    if (typeof dump.idToImage === 'object') {
      this.idToImage = {};

      for (let id in dump.idToImage) {
        const image = dump.idToImage[id];

        this.idToImage[id] = new Image(
          image.id,
          image.size,
          image.mimeType,
          image.uploadedAt
        );
      }
    }
  }

  async insert(image) {
    this.idToImage[image.id] = image;

    this.emit('changed');
  }

  async remove(imageId) {
    const imageRaw = this.idToImage[imageId];

    const image = new Image(
      imageRaw.id,
      imageRaw.size,
      imageRaw.mimeType,
      imageRaw.uploadedAt
    );

    await image.removeOriginal();

    delete this.idToImage[imageId];

    this.emit('changed');

    return imageId;
  }

  findOne(svgId) {
    const imageRaw = this.idToSvg[svgId];

    if (!imageRaw) {
      return null;
    }

    const image = new Image(
      imageRaw.id,
      imageRaw.size,
      imageRaw.mimeType,
      imageRaw.uploadedAt
    );

    return image;
  }

  getAllImages() {
    let allImages = Object.values(this.idToImage);

    allImages.sort((imgA, imgB) => imgA.uploadedAt - imgB.uploadedAt);

    return allImages;
  }

  toJSON() {
    return {
      idToImage: this.idToImage,
    };
  }
}

const db = new Database();

db.initFromDump();

db.on('changed', () => {
  writeFile(dbDumpFile, prettifyJsonToString(db.toJSON()));
});

module.exports = db;
