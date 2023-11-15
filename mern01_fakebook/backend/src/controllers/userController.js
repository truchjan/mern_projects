const asyncHandler = require("express-async-handler")
const User = require('../models/user')

exports.userList = asyncHandler(async (req, res, next) => {
  const users = await User.find().sort({ name: 1 }).populate('posts')
  res.json(users)
})

exports.userDetail = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('posts')
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
      imageURL: req.body.imageURL,
      about: req.body.about,
      _id: req.params.id, // This is required, or a new ID will be assigned!
    })
    // {new: true} - method returns document AFTER the update
    // {runValidators: true} - turns on validators defined in model
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