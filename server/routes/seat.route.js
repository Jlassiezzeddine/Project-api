const router = require("express").Router();
const seatController = require("../controllers/seatController");

router.post("/", seatController.createSeat);
router.get("/", seatController.getAllSeats);
router.get("/filter", seatController.getfilteredSeats);
router.get("/:id", seatController.getSeatById);
router.patch("/:id", seatController.editSeat);
router.delete("/:id", seatController.deleteSeat);

module.exports = router;
