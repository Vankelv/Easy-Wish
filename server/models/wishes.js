const mongoose = require('mongoose');

const wishSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    maxlength: 500 
  },
  senderName: {
    type: String,
    required: true
  },

  avatar: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Wish = mongoose.model('Wish', wishSchema);

module.exports = Wish;
