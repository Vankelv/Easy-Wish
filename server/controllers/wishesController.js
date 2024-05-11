const Wishes = require("../models/wishes.js");
const express = require('express');
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const sendWishEmail = require("../data/email.js")

const upload = require("../middlewares/multer");



exports.getAllWishes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalWishes = await Wishes.countDocuments({});
    const totalPages = Math.ceil(totalWishes / limit);

   
    const wishes = await Wishes.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    const wishesWithImages = wishes.map((wish) => {
      return {
        ...wish,
        avatarUrl: wish.avatar, 
      };
    });

    res.json({ wishes, wishesWithImages, totalPages });
  } catch (error) {
    console.error('Error retrieving wishes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Controller function to create a new wish
exports.createWish = async (req, res) => {
  try {
    let avatarUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      avatarUrl = result.secure_url;
    }
    const wish = new Wishes({
      message: req.body.message,
      senderName: req.body.senderName,
      avatar: avatarUrl
    });
    await wish.save();

    sendWishEmail(req.body.senderName, req.body.message, avatarUrl);
    res.status(201).json({
      success: true,
      message: "Wish created successfully",
      data: wish
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error creating wish"
    });
  }
};