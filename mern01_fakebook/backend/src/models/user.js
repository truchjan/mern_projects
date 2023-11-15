const mongoose = require('mongoose')
const Post = require('./post')

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 100,
    required: true
  },
  email: {
    type: String,
    minLength: 5,
    maxLength: 100,
    required: true,
    unique: true
  },
  imageURL: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  emailVerified: {
    type: Boolean,
    required: true,
    default: false
  },
  authTime: {
    type: Number,
    required: true
  },
  about: {
    type: String,
    maxLength: 1000,
    required: false
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  ],
  friendRequests: [
    {
      timestamp: {
        type: Date,
        default: () => Date.now()
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    }
  ]
}, {timestamps: true})

UserSchema.virtual('posts', {
  ref: Post,
  localField: '_id',
  foreignField: 'user'
})

UserSchema.virtual('requestedFriends', {
  ref: 'User',
  localField: '_id',
  foreignField: 'friendRequests.user'
})

// to actualy get virtuals in JSON, call populate(wanted virtuals) while finding them in controller
UserSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v
    delete ret.id
  }
})

UserSchema.set('toObject', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v
    delete ret.id
  }
})

module.exports = mongoose.model('User', UserSchema)