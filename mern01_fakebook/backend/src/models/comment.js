const mongoose = require("mongoose")

const CommentSchema = mongoose.Schema({
  text: {
    type: String,
    maxLength: 1000,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model('Comment', CommentSchema)
