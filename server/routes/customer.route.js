const router = require("express").Router();
const {
  registerCustomer,
  loginCustomer,
  forgotPasswordCustomer,
  logoutCustomer,
} = require("../utils/auth");
const customerController = require("../controllers/customerController");

//Authentication Routes
router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.post("/forgot-password", forgotPasswordCustomer);
router.get("/logout", logoutCustomer);

//Customer Routes
router.get("/", customerController.getAll);
router.get("/:id", customerController.getcustomerById);
router.patch("/:id/edit", customerController.editCustomer);
router.patch("/:id/reset-password", customerController.resetPassword);
router.delete("/:id", customerController.deleteCustomer);

// Customer => Favourites Routes
router.get("/:id/favourites", customerController.getFavourites);
router.patch("/:id/add-favourite/:movieId", customerController.addFavourite);
router.patch(
  "/:id/remove-favourite/:movieId",
  customerController.removeFavourite
);

// Customer => Preferences Routes
router.get("/:id/preferences", customerController.getPreferences);
router.patch("/:id/set-preferences/", customerController.setPreferences);

module.exports = router;
