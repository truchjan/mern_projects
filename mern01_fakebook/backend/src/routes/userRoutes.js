const router = require('express').Router()

const userController = require("../controllers/userController")

router.get("/:id", userController.userDetail)

router.get("/", userController.userList)

router.put("/:id", userController.updateUserDetail)

router.put("/sendfriendrequest/:id", userController.sendFriendRequest)

router.put("/cancelfriendrequest/:id", userController.cancelFriendRequest)

// TODO router.put("/acceptfriendrequest/:id", userController.acceptFriendRequest)

// TODO router.put("/rejectfriendrequest/:id", userController.rejectFriendRequest)

module.exports = router