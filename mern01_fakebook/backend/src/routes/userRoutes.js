const router = require('express').Router()

const userController = require("../controllers/userController")

router.get("/:id", userController.userDetail)

router.get("/", userController.userList)

router.put("/:id", userController.updateUserDetail)

router.get("/:id/posts", userController.getUserPosts)

router.put("/sendfriendrequest/:id", userController.sendFriendRequest)

router.put("/cancelfriendrequest/:id", userController.cancelFriendRequest)

router.put("/acceptfriendrequest/:id", userController.acceptFriendRequest)

router.put("/rejectfriendrequest/:id", userController.rejectFriendRequest)

router.put("/removefriend/:id", userController.removeFriend)

module.exports = router