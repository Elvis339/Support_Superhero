/* eslint-disable camelcase */
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const crypto = require('crypto');

const ENV = process.env.NODE_ENV;

module.exports = {
  GET_ROOT_PATH: (dirname) => {
    if (typeof dirname !== 'string') {
      return `${dirname} is not string!`;
    } if (!fs.existsSync(dirname)) {
      return `${dirname} directory does not exists!`;
    }
    return `${require.main.filename
      .split('/')
      .filter((elem) => elem !== dirname && elem !== 'app-cli.js' && elem !== 'index.js')
      .join('/')}/`;
  },

  date_now: () => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (month < 10) {
      month = `0${month}`;
    }

    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  },

  documentsUpload() {
    const root_dir = path.dirname(require.main.filename);
    const uploads_directory = path.join(root_dir, 'uploads');

    if (!fs.existsSync(uploads_directory)) {
      fs.mkdirSync(uploads_directory);
    }

    const storage = multer.diskStorage({
      destination(req, file, cb) {
        cb(null, uploads_directory);
      },
      filename(req, file, cb) {
        cb(null, crypto.randomBytes(48).toString('hex'));
      },
    });
    return multer({ storage, limits: { fileSize: 2147483648 } }); // 2GB
  },

  isDevelopmentMode: () => (ENV === 'development'),
};
