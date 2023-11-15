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

CommentSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v
    delete ret.id
  }
})

CommentSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.__v
    delete ret.id
  }
})


module.exports = mongoose.model('Comment', CommentSchema)
