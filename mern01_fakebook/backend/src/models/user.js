const mongoose = require('mongoose')

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

module.exports = mongoose.model('User', UserSchema)