const mongoose = require("mongoose")
// const Comment = require('./comment')

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

// PostSchema.virtual('comments', {
//   ref: Comment,
//   localField: '_id',
//   foreignField: 'post',
// })

// PostSchema.virtual('commentCount', {
//   ref: Comment,
//   localField: '_id',
//   foreignField: 'post',
//   count: true,
// })

// // TODO - funguje? smazat asi ten if řádek, nechápu co dělá
// PostSchema.set('toJSON', {
//   virtuals: true,
//   transform: (doc, ret) => {
//     if (!ret.id && ret._id) ret.id = ret._id.toString()
//     delete ret._id
//     delete ret.__v
//   }
// })

module.exports = mongoose.model('Post', PostSchema)
