const asyncHandler = require("express-async-handler")
const User = require('../models/user')
const Post = require('../models/post')

exports.userList = asyncHandler(async (req, res, next) => {
  const users = await User.find().sort({ name: 1 }).populate('friends posts requestedFriends friendRequests.user')
  res.json(users)
})

exports.userDetail = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('friends posts requestedFriends friendRequests.user')
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

    // mongoose findByIdAndUpdate deletes all refs to the same model - this helps keep then
    const oldUser = await User.findById(req.params.id)

    const user = new User({
      name: req.body.name,
      imageURL: req.body.imageURL,
      about: req.body.about,
      friends: oldUser.friends,
      friendRequests: oldUser.friendRequests,
      _id: req.params.id, // This is required, or a new ID will be assigned!
    })
    // {new: true} - method returns document AFTER the update
    // {runValidators: true} - turns on validators defined in model
    const updatedUser = await User.findByIdAndUpdate(req.params.id, user, {new: true, runValidators: true})
    console.log(updatedUser)

    if(updatedUser) {
      res.json(updatedUser)
    } else {
      throw new Error("User not found")
    }
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

exports.getUserPosts = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if(!user) throw new Error("User not found")

    const posts = await Post.find({user: req.params.id}).sort({ createdAt: -1 }).populate("user likes comments commentCount")
    res.json(posts)

  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

exports.sendFriendRequest = asyncHandler(async (req, res, next) => {
  try {
    const sender = await User.findById(req.params.id)
    const reciever = await User.findById(req.body.user)
    if(!sender || !reciever) throw new Error("User not found")

    const alreadyFriends = sender.friends.find(item => item._id.equals(reciever._id))
    if(alreadyFriends) throw new Error("Already friends")

    const friendRequestSent = reciever.friendRequests.find(item => item.user.equals(sender._id))
    if(friendRequestSent) throw new Error("Friend request already sent to this user")

    const friendRequestRecieved = sender.friendRequests.find(item => item.user.equals(reciever._id))
    if(friendRequestRecieved) throw new Error("Friend request already recieved from this user")

    const datenow = Date.now()
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

exports.acceptFriendRequest = asyncHandler(async (req, res, next) => {
  try {
    const sender = await User.findById(req.params.id)
    const reciever = await User.findById(req.body.user)
    if(!sender || !reciever) throw new Error("User not found")

    const friendRequest = sender.friendRequests.find(item => item.user.equals(reciever._id))
    if(!friendRequest) throw new Error("Friend request not found")

    sender.friendRequests.pull({ _id: friendRequest._id})
    sender.friends.push(reciever)
    const updatedSender = await sender.save()

    reciever.friends.push(sender)
    const updatedReciever = await reciever.save()
    if(updatedSender && updatedReciever) {
      res.json({sender: updatedSender, reciever: updatedReciever})
    } else {
      throw new Error("Friend request acceptation failed")
    }
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

exports.rejectFriendRequest = asyncHandler(async (req, res, next) => {
  try {
    const sender = await User.findById(req.params.id)
    const reciever = await User.findById(req.body.user)
    if(!sender || !reciever) throw new Error("User not found")

    const friendRequest = sender.friendRequests.find(item => item.user.equals(reciever._id))
    if(!friendRequest) throw new Error("Friend request not found")

    sender.friendRequests.pull({ _id: friendRequest._id})
    const updatedSender = await sender.save()

    if(updatedSender) {
      res.json(updatedSender)
    } else {
      throw new Error("Friend request rejection failed")
    }
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

exports.removeFriend = asyncHandler(async (req, res, next) => {
  try {
    const sender = await User.findById(req.params.id)
    const reciever = await User.findById(req.body.user)
    if(!sender || !reciever) throw new Error("User not found")

    const friend = sender.friends.find(item => item._id.equals(reciever._id))
    if(!friend) throw new Error("Not friends")

    sender.friends.pull({_id: reciever._id})
    const updatedSender = await sender.save()

    reciever.friends.pull({_id: sender._id})
    const updatedReciever = await reciever.save()

    if(updatedSender && updatedReciever) {
      res.json({sender: updatedSender, reciever: updatedReciever})
    } else {
      throw new Error("Friend remove failed")
    }
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})