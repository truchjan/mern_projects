const asyncHandler = require("express-async-handler")
const User = require('../models/user')
const Reservation = require('../models/reservation')

exports.userList = asyncHandler(async (req, res, next) => {
  const users = await User.find().sort({ name: 1 }).populate('reservations')
  res.json(users)
})

exports.userDetail = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('reservations')
    if(user) {
      res.json(user)
    } else {
      throw new Error("User not found")
    }
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

exports.updateUserDetail = asyncHandler(async (req, res, next) => {
  try {
    const user = new User({
      name: req.body.name,
      _id: req.params.id // This is required, or a new ID will be assigned!
    })
    const updatedUser = await User.findByIdAndUpdate(req.params.id, user, {new: true, runValidators: true})

    if(updatedUser) {
      res.json(updatedUser)
    } else {
      throw new Error("User not found")
    }
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

exports.getUserReservations = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if(!user) throw new Error("User not found")

    const reservations = await Reservation.find({user: req.params.id}).sort({ createdAt: -1 }).populate("user court")
    res.json(reservations)

  } catch(err) {
    res.status(400).json({message: err.message})
  }
})