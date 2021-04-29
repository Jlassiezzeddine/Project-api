const router = require("express").Router();
const screeningController = require("../controllers/screeningController");
//Create Screening
router.post("/add", screeningController.createScreening);
//Edit Screening
router.patch("/:id/edit", screeningController.editScreening);
//Publish Screening
router.patch("/:id/publish", screeningController.publishScreening);
//Remove Screening
router.delete("/:id", screeningController.deleteScreening);

//Get All Screenings
router.get("/all", screeningController.getAllScreenings);
//Get Screening by id
router.get("/:id", screeningController.getScreeningById);
//Get screenings by movie
router.get("/movie/:movieId", screeningController.getScreeningsByMovie);

module.exports = router;
