const express = require("express")
const router = express.Router()

const postController = require("../controllers/postController")

router.get("/", postController.postList)

router.get("/:id", postController.postDetail)

router.post("/", postController.createPost)

router.put("/:id", postController.updatePost)

router.delete("/:id", postController.deletePost)

router.put("/addlike/:id", postController.addLike)

router.put("/removelike/:id", postController.removeLike)

module.exports = router