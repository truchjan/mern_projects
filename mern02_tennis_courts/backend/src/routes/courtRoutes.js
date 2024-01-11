const express = require("express")
const router = express.Router()

const courtController = require("../controllers/courtController")

router.get("/", courtController.courtList)

router.get("/:number", courtController.courtDetailByNumber)

router.post("/", courtController.createCourt)

router.put("/:id", courtController.updateCourt)

router.delete("/:id", courtController.deleteCourt)

router.get("/:id/reservations", courtController.getCourtReservations)

router.get("/:id/reservations/:day", courtController.getCourtReservationsDay)

module.exports = router