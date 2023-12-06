const asyncHandler = require("express-async-handler")
const User = require("../models/user")
const Reservation = require("../models/reservation")

exports.reservationList = asyncHandler(async (req, res, next) => {
  const reservations = await Reservation.find().sort({ createdAt: -1 }).populate("user court")
  res.json(reservations)
})

exports.reservationDetail = asyncHandler(async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate("user court")
    if(reservation) {
      res.json(reservation)
    } else {
      throw new Error("Reservation not found")
    }
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

// postman example - {"from": "2023-12-06T16:00", "to": "2023-12-06T17:00", "user": "6570a8aaba694d1124eb344a", "court": "6570dabd2888d4f91522a125"}
exports.createReservation = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.body.user)
    if(!user) {
      throw new Error("User not found")
    }

    const reservation = new Reservation({
      from: req.body.from,
      to: req.body.to,
      user: req.body.user,
      court: req.body.court
    })
    const created = await reservation.save()
    res.json(await created.populate('user court'))
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

exports.updateReservation = asyncHandler(async (req, res, next) => {
  try {
    const reservation = new Reservation({
      from: req.body.from,
      to: req.body.to,
      _id: req.params.id
    })
    const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, reservation, {new: true, runValidators: true})
    
    if(updatedReservation) {
      res.json(updatedReservation)
    } else {
      throw new Error("Reservation not found")
    }
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

exports.deleteReservation = asyncHandler(async (req, res, next) => {
  try {
    const reservation = await Reservation.deleteOne({_id: req.params.id})
    if(reservation.deletedCount !== 0) {
      res.json(reservation)
    } else {
      throw new Error("Reservation not found")
    }
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})