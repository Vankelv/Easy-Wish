const multer = require("multer");
const cloudinary = require('../cloudinary');


const multerUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: function(req, file, callback) {
    if(
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg" 
    ){
      callback(null, true)
    } else {
      console.log("Only jpg & png files supported");
      callback(null, false)
    }
  },
  limits:{
    fileSize: 1024 * 1024 * 2
  }
});

const uploadImage = async (req, res, next) => {
  try {
    const uniqueId = require('uuid').v4(); // Generate a unique UUID
    const result = await cloudinary.uploader.upload(req.file.buffer, {
      public_id: `wish-${uniqueId}`,
      format: 'jpg',
    });
    req.image = result.secure_url;
    next();
  } catch (err) {
    res.status(500).json({ message: 'Failed to upload image' });
  }
};

module.exports = { multerUpload, uploadImage };