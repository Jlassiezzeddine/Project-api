const router = require("express").Router();
const discountController = require("../controllers/discountController");

router.post("/", discountController.createDiscount);
router.get("/", discountController.getAllDiscounts);
router.patch("/:id", discountController.editDiscount);
router.delete("/:id", discountController.removeDiscount);
router.get("/filter", discountController.getFilteredDiscounts);
router.get("/:id", discountController.getDiscountById);

module.exports = router;
