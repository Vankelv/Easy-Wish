const express = require('express');
const router = express.Router();
const Wishes = require('../models/wishes.js');
const wishesController = require('../controllers/wishesController.js')
const readForbiddenWordsMiddleware = require('../middlewares/filterWordsMiddleware.js')
const { multerUpload, uploadImage } = require("../middlewares/upload")

router.get('/', wishesController.getAllWishes);
router.post('/', readForbiddenWordsMiddleware, multerUpload.single('avatar'), wishesController.createWish);

module.exports = router;