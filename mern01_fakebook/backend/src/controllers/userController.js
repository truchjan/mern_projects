const asyncHandler = require("express-async-handler")
const User = require('../models/user')

exports.userList = asyncHandler(async (req, res, next) => {
  const users = await User.find().sort({ name: 1 }).populate('posts requestedFriends')
  res.json(users)
})

exports.userDetail = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('posts requestedFriends')
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

// todo - ověření, zda už nebyl request poslán nebo zda už nejsou přátelé
exports.sendFriendRequest = asyncHandler(async (req, res, next) => {
  try {
    const sender = await User.findById(req.params.id)
    const reciever = await User.findById(req.body.user)
    const datenow = Date.now()
    if(!sender || !reciever) throw new Error("User not found")

    reciever.friendRequests.push({timestamp: datenow, user: sender})
    const updated = await reciever.save()
    if(updated) {
      res.json(updated)
    } else {
      throw new Error("Friend request failed")
    }
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

exports.cancelFriendRequest = asyncHandler(async (req, res, next) => {
  try {
    const sender = await User.findById(req.params.id)
    const reciever = await User.findById(req.body.user)
    if(!sender || !reciever) throw new Error("User not found")
    
    const friendRequest = reciever.friendRequests.find(item => item.user.equals(sender._id))
    if(!friendRequest) throw new Error("Friend request not found")

    reciever.friendRequests.pull({ _id: friendRequest._id})
    const updated = await reciever.save()
    if(updated) {
      res.json(updated)
    } else {
      throw new Error("Friend request cancelation failed")
    }
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})