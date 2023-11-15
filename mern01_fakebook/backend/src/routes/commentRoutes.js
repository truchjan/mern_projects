const express = require("express")
const router = express.Router()

const commentController = require("../controllers/commentController")

router.get("/", commentController.commentList)

router.get("/:id", commentController.commentDetail)

router.post("/", commentController.createComment)

router.put("/:id", commentController.updateComment)

router.delete("/:id", commentController.deleteComment)

module.exports = router