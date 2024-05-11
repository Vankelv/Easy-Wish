const multer = require('multer');

const storage = multer.diskStorage({
  filename: function (req,file,cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      if (file.fieldname !== 'avatar') {
        return cb(new Error('Only image field is allowed'));
      }
      cb(null, true);
    }
  });

module.exports = upload;