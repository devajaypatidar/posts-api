// server/models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  message: {
    type: String,
    required: true,
  },
  comments: [
    {
      sentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      sentAt: {
        type: Date,
        default: Date.now,
      },
      content:{
        type: String,
        required: true,
      },
      liked: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
  ],
});

module.exports = mongoose.model('Post', PostSchema);
