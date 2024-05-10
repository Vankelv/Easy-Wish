const express = require('express');
const router = express.Router();
const Wishes = require('../models/wishes.js');
const wishesController = require('../controllers/wishesController.js')
const upload = require("../middlewares/upload")
const  readForbiddenWordsMiddleware = require('../middlewares/filterWordsMiddleware.js')



router.get('/', wishesController.getAllWishes);
router.post('/', readForbiddenWordsMiddleware, upload.single('avatar'), wishesController.createWish);


module.exports = router;