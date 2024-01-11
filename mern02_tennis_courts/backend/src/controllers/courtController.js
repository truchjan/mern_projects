const asyncHandler = require("express-async-handler")
const Court = require("../models/court")
const Reservation = require("../models/reservation")

exports.courtList = asyncHandler(async (req, res, next) => {
  const courts = await Court.find().populate("reservations")
  res.json(courts)
})

exports.courtDetailByNumber = asyncHandler(async (req, res, next) => {
  try {
    const court = await Court.findOne({number: req.params.number}).populate("reservations")
    if(court) {
      res.json(court)
    } else {
      throw new Error("Court not found")
    }
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

// postman example - {"number": "1"}
exports.createCourt = asyncHandler(async (req, res, next) => {
  try {
    const court = new Court({
      number: req.body.number
    })
    const created = await court.save()
    res.json(await created.populate('reservations'))
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

exports.updateCourt = asyncHandler(async (req, res, next) => {
  try {
    const court = new Court({
      number: req.body.number,
      _id: req.params.id
    })
    const updatedCourt = await Court.findByIdAndUpdate(req.params.id, court, {new: true, runValidators: true})
    
    if(updatedCourt) {
      res.json(updatedCourt)
    } else {
      throw new Error("Court not found")
    }
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

exports.deleteCourt = asyncHandler(async (req, res, next) => {
  try {
    const court = await Court.deleteOne({_id: req.params.id})
    if(court.deletedCount !== 0) {
      res.json(court)
    } else {
      throw new Error("Court not found")
    }
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

exports.getCourtReservations = asyncHandler(async (req, res, next) => {
  try {
    const court = await Court.findById(req.params.id)
    if(!court) throw new Error("Court not found")

    const reservations = await Reservation.find({court: req.params.id}).sort({ from: -1 }).populate("user court")
    res.json(reservations)

  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

function addOneDay(date) {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + 1)
  return newDate
}

exports.getCourtReservationsDay = asyncHandler(async (req, res, next) => {
  try {
    const court = await Court.findById(req.params.id)
    if(!court) throw new Error("Court not found")

    const date = new Date(req.params.day)
    const reservations = await Reservation.find({court: req.params.id, from: {$gte: date, $lt: addOneDay(date)}}).sort({ from: -1 }).populate("user court")
    res.json(reservations)

  } catch(err) {
    res.status(400).json({message: err.message})
  }
})