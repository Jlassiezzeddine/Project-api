const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
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
  reservationNumber: { type: String, required: true },
  creationDate: { type: Date, default: Date.now() },
  paid: {
    type: Boolean,
    default: false,
    required: true,
  },
  //We need to make sure that the reservation is deleted automatically once it's screening is done
});

module.exports = mongoose.model("Reservation", reservationSchema);
