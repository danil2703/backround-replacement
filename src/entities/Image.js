const path = require('path');
const { nanoid } = require('nanoid');
const { imageFolder } = require('../config');
const { removeFile } = require('../utils/fs');
module.exports = class Image {
  constructor(id, size, mimeType, uploadedAt) {
    this.id = id || nanoid();
    this.size = size;
    this.mimeType = mimeType;
    this.uploadedAt = uploadedAt || Date.now();
  }

  async removeOriginal() {
    await removeFile(path.resolve(imageFolder, `${this.id}.jpg`));
  }

  toJSON() {
    return {
      id: this.id,
      size: this.size,
      mimeType: this.mimeType,
      uploadedAt: this.uploadedAt,
    };
  }
};

/*
где interface File {
  id: string
  uploadedAt: number
  size: number
  body: Buffer
  mimeType?: string
}
*/
