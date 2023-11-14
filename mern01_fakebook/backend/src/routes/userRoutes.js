const router = require('express').Router()

const userController = require("../controllers/userController")

router.get("/:id", userController.userDetail)

router.get("/", userController.userList)

router.put("/:id", userController.updateUserDetail)

module.exports = router