const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema(
  {
    screeningId: { type: mongoose.Schema.Types.ObjectId, ref: "Screening" },
    discount_start: {
      type: Date,
      required: [true, "Discount must have a start/end date"],
    },
    discount_end: {
      type: Date,
      required: [true, "Discount must have a start/end date"],
    },
    percentage: {
      type: Number,
      min: 0,
      max: 100,
      required: [true, "Discount must have an amount value"],
    },
  },
  { timestamps: true }
);
const Discount = mongoose.model("Discount", discountSchema);
module.exports = Discount;
