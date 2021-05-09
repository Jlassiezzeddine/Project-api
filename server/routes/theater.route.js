const router = require("express").Router();

const {
  registerTheater,
  loginTheater,
  forgotPasswordTheater,
  logoutTheater,
} = require("../utils/auth");

const theaterController = require("../controllers/theaterController");
const { protectAdmin } = require("../middlewares/checkAuth");

//Authentication Routes
router.post("/register", registerTheater);
router.post("/login", loginTheater);
router.post("/forgot-password", forgotPasswordTheater);
router.get("/logout", logoutTheater);

//Theater routes
router.get("/", theaterController.getAllTheaters);
router.get("/:id", theaterController.getTheaterById);
router.patch("/:id/edit", theaterController.editTheater);
router.patch("/:id/reset-password", theaterController.resetPassword);
router.delete("/:id", theaterController.deleteTheater);

module.exports = router;
