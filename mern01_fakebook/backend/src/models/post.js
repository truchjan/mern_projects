const mongoose = require("mongoose")
const Comment = require('./comment')

const PostSchema = mongoose.Schema({
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
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
}, {timestamps: true})

PostSchema.virtual('comments', {
  ref: Comment,
  localField: '_id',
  foreignField: 'post',
})

PostSchema.virtual('commentCount', {
  ref: Comment,
  localField: '_id',
  foreignField: 'post',
  count: true,
})

PostSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v
    delete ret.id
  }
})

PostSchema.set('toObject', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v
    delete ret.id
  }
})

module.exports = mongoose.model('Post', PostSchema)
