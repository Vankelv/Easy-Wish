const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dixhhfgil', 
  api_key: '837931239471236', 
  api_secret: 'NdO_gQFiMJVE8Zwp3CKLsNu0auc' 
});
module.exports = cloudinary;