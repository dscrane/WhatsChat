const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(res, file, cb) {
    if (!file.originalName.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('File can only be an image (jpg, jpeg, png).'))
    }
    cb(undefined, true);
  }
})

module.exports = upload;