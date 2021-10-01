const { nanoid } = require('nanoid');

module.exports = class Image {
  constructor(id, createdAt) {
    this.id = id || nanoid();
    this.createdAt = createdAt || Date.now();
  }
};
