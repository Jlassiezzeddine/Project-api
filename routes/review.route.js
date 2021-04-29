const router = require("express").Router();
const reviewController = require("../controllers/reviewController");

router.post("/", reviewController.createReview);
router.get("/", reviewController.getReviews);
router.get("/filter", reviewController.getFilteredReviews);
router.get("/:id", reviewController.getReviewById);
router.patch("/:id", reviewController.editReview);
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
