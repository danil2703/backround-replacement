const EventEmitter = require('events');
const { writeFile } = require('../utils/fs');
const { existsSync } = require('fs');
const { dbDumpFile } = require('../config');
const { prettifyJsonToString } = require('../utils/prettifyJsonToString');

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

        this.idToImage[id] = new Image(image.id, image.createdAt);
      }
    }
  }

  async insert(image) {
    this.idToImage[image.id] = image;

    this.emit('changed');
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
