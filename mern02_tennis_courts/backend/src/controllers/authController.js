const asyncHandler = require("express-async-handler")
const User = require('../models/user')

const newUserData = async (req, res) => {
  const newUser = new User({
    name: req.user.name || req.user.email,
    email: req.user.email,
    imageURL: req.user.picture || 'https://t3.ftcdn.net/jpg/00/57/04/58/360_F_57045887_HHJml6DJVxNBMqMeDqVJ0ZQDnotp5rGD.jpg',
    userId: req.user.user_id,
    emailVerified: req.user.email_verified,
    authTime: req.user.auth_time
  })

  try {
    const savedUser = await newUser.save()
    return res.status(200).send({ user: savedUser })
  } catch(err) {
    return res.status(400).send({ message: err})
  }
}

const updateUserData = async (req, res) => {
  const filter = { userId: req.user.user_id }
  const options = { upsert: true, new: true }

  try {
    const updatedUser = await User.findOneAndUpdate(filter, {authTime: req.user.auth_time}, options).populate('reservations')
    return res.status(200).send({ user: updatedUser })
  } catch(err) {
    return res.status(400).send({ message: err})
  }
}

exports.validateUser = asyncHandler(async (req, res) => {
  try {
    const userExists = await User.findOne({ userId: req.user.user_id })

    if(!userExists) {
      return newUserData(req, res)
    } else {
      return updateUserData(req, res)
    }

  } catch(err) {
    return res.status(500).send({message: err})
  }
})