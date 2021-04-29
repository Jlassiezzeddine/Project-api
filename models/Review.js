const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  theaterId: { type: mongoose.Schema.Types.ObjectId, ref: "Theater" },
  comment: {
    type: String,
    required: [true, "A review must have a feedback comment"],
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    required: [true, "A review must have a rating"],
  },
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
