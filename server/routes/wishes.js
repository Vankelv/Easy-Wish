const express = require('express');
const router = express.Router();
const Wishes = require('../models/wishes.js');
const wishesController = require('../controllers/wishesController.js')
const Upload = require('../middlewares/multer.js')
const readForbiddenWordsMiddleware = require('../middlewares/filterWordsMiddleware.js')

router.get('/', wishesController.getAllWishes);
router.post('/', readForbiddenWordsMiddleware, Upload.single('avatar'), wishesController.createWish);

module.exports = router;