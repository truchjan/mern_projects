const express = require("express")
const router = express.Router()

const reservationController = require("../controllers/reservationController")

router.get("/", reservationController.reservationList)

router.get("/:id", reservationController.reservationDetail)

router.post("/", reservationController.createReservation)

router.put("/:id", reservationController.updateReservation)

router.delete("/:id", reservationController.deleteReservation)

module.exports = router