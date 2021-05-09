const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    state: {
      type: String,
      enum: ["taken", "free", "unavailable"],
      default: "free",
    },
    seatNumber: {
      type: Number,
      required: [true, "Seat must have a number"],
    },
    seatRow: {
      type: String,
      required: [true, "Seat must have a row property"],
    },
    seatColumn: {
      type: String,
      required: [true, "Seat must have a column property"],
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: [true, "Seat must be assigned to a specific room"],
    },
  },
  { timestamps: true }
);
const Seat = mongoose.model("Seat", seatSchema);
module.exports = Seat;
