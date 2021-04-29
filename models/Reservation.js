const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    screeningId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Screening",
      required: true,
    },
    seatIds: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Seat", required: true },
    ],
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    reservationNumber: { type: Number, required: true },
    paid: {
      type: Boolean,
      default: false,
      required: true,
    },
    //We need to make sure that the reservation is deleted automatically once it's screening is done
  },
  { timestamps: true }
);
const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
