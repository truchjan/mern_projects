const mongoose = require("mongoose")
const Reservation = require('./reservation')

const CourtSchema = mongoose.Schema({
  number: {
    type: Number,
    required: true
  }
}, {timestamps: true})

CourtSchema.virtual('reservations', {
  ref: Reservation,
  localField: '_id',
  foreignField: 'court'
})

CourtSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v
    delete ret.id
  }
})

CourtSchema.set('toObject', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v
    delete ret.id
  }
})

module.exports = mongoose.model('Court', CourtSchema)