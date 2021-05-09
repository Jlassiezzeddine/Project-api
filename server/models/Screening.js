const mongoose = require("mongoose");

const screeningSchema = new mongoose.Schema(
  {
    //Capacity ??? ref ??
    date: { type: Date, required: [true, "Screening must have a date"] },
    startTime: {
      type: Date,
      required: [true, "Screening must have a start time"],
    },
    endTime: {
      type: Date,
      required: [true, "Screening must have an end time"],
    },
    published: { type: Boolean, default: false, required: true },
    full: { type: Boolean, default: false, required: true },
    price: {
      type: Number,
      required: [true, "Screening must have a price"],
    },

    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    discountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discount",
    },
  },
  { timestamps: true }
);
const Screening = mongoose.model("Screening", screeningSchema);
module.exports = Screening;
