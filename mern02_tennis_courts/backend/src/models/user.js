const mongoose = require('mongoose')
const Reservation = require('./reservation')

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
  }
}, {timestamps: true})

UserSchema.virtual('reservations', {
  ref: Reservation,
  localField: '_id',
  foreignField: 'user'
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