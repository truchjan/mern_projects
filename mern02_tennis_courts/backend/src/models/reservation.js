const mongoose = require("mongoose")

const ReservationSchema = mongoose.Schema({
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  court: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Court',
    required: true
  }
}, {timestamps: true})

ReservationSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v
    delete ret.id
  }
})

ReservationSchema.set('toObject', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v
    delete ret.id
  }
})

module.exports = mongoose.model('Reservation', ReservationSchema)
