const asyncHandler = require("express-async-handler")
const User = require("../models/user")
const Post = require("../models/post")
const Comment = require("../models/comment")

exports.commentList = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find().sort({ createdAt: 1 }).populate("user post")
  res.json(comments)
})

exports.commentDetail = asyncHandler(async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id).populate("user post")
    if(comment) {
      res.json(comment)
    } else {
      throw new Error("Comment not found")
    }
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

// postman example - {"text": "hello, this is interesting comment", "user": "6553ae15a9cec3cf36a90ef8", "post": "6553ae15a9cec3cf36a90ee7"}
exports.createComment = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.body.user)
    if(!user) {
      throw new Error("User not found")
    }

    const post = await Post.findById(req.body.post)
    if(!post) {
      throw new Error("Post not found")
    }

    const comment = new Comment({
      text: req.body.text,
      user: req.body.user,
      post: req.body.post
    })
    const created = await comment.save()
    res.json(await created.populate('user post'))
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

exports.updateComment = asyncHandler(async (req, res, next) => {
  try {
    const comment = new Comment({
      text: req.body.text,
      _id: req.params.id
    })
    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, comment, {new: true, runValidators: true})
    
    if(updatedComment) {
      res.json(updatedComment)
    } else {
      throw new Error("Comment not found")
    }
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

exports.deleteComment = asyncHandler(async (req, res, next) => {
  try {
    const comment = await Comment.deleteOne({_id: req.params.id})
    if(comment.deletedCount !== 0) {
      res.json(comment)
    } else {
      throw new Error("Comment not found")
    }
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})