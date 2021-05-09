const router = require("express").Router();
const roomController = require("../controllers/roomController");
//create room
router.post("/add", roomController.createRoom);
//edit room
router.patch("/:id", roomController.editRoom);
//remove room
router.delete("/:id", roomController.removeRoom);

//Get all Rooms
router.get("/", roomController.getAllRooms);

//Get room by id
router.get("/:id", roomController.getRoomById);

module.exports = router;
