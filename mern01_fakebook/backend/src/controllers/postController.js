const asyncHandler = require("express-async-handler")
const User = require("../models/user")
const Post = require("../models/post")
const Comment = require("../models/comment")

exports.postList = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().sort({ createdAt: -1 }).populate("user likes comments commentCount")
  res.json(posts)
})

exports.postDetail = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate("user likes comments commentCount")
    if(post) {
      res.json(post)
    } else {
      throw new Error("Post not found")
    }
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

// postman example - {"text": "hello, this is interesting post", "user": "6553ae15a9cec3cf36a90ef8"}
exports.createPost = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.body.user)
    if(!user) {
      throw new Error("User not found")
    }

    const post = new Post({
      text: req.body.text,
      user: req.body.user
    })
    const created = await post.save()
    res.json(await created.populate('user'))
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

exports.updatePost = asyncHandler(async (req, res, next) => {
  try {
    const post = new Post({
      text: req.body.text,
      _id: req.params.id
    })
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, {new: true, runValidators: true})
    
    if(updatedPost) {
      res.json(updatedPost)
    } else {
      throw new Error("Post not found")
    }
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

exports.deletePost = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.deleteOne({_id: req.params.id})
    await Comment.deleteMany({post: req.params.id})
    if(post.deletedCount !== 0) {
      res.json(post)
    } else {
      throw new Error("Post not found")
    }
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

exports.getPostComments = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
    if(!post) throw new Error("Post not found")

    const comments = await Comment.find({post: req.params.id}).sort({ createdAt: 1 }).populate("user post")
    res.json(comments)

  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

exports.addLike = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
    if(!post) throw new Error("Post not found")

    const user = await User.findById(req.body.user)
    if(!user) throw new Error("User not found")

    const alreadyLiked = post.likes.find(item => item._id.equals(user._id))
    if(alreadyLiked) throw new Error("Already liked")

    post.likes.push(user)
    const updated = await post.save()

    if(updated) {
      res.json(updated)
    } else {
      throw new Error("Add like failed")
    }
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

exports.removeLike = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
    if(!post) throw new Error("Post not found")

    const user = await User.findById(req.body.user)
    if(!user) throw new Error("User not found")

    post.likes.pull(user)
    const updated = await post.save()

    if(updated) {
      res.json(updated)
    } else {
      throw new Error("Add like failed")
    }
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})