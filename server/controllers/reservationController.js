const Reservation = require("../models/Reservation");
const Seat = require("../models/Seat");
const Screening = require("../models/Screening");
const ErrorHandler = require("../helpers/errorHandler");

//Create reservation
const createReservation = async (req, res, next) => {
  let { screeningId, seatIds, customerId } = req.body;

  try {
    //getting reservation number
    const reservationNumber = await getReservationNumber();

    //make sure that seats are available

    const notFree = await Seat.find({
      _id: { $in: seatIds },
      state: { $ne: "free" },
    }).select("seatNumber");
    if (notFree.length > 0)
      throw new ErrorHandler(400, `Not available seats : ${notFree}`);

    const reservation = await Reservation.create({
      screeningId,
      seatIds,
      customerId,
      reservationNumber,
    });

    //update seats state to taken
    await Seat.updateMany(
      { _id: { $in: seatIds } },
      { $set: { state: "taken" } }
    ).exec();

    res.status(201).json({
      success: true,
      reservation,
    });
  } catch (error) {
    next(error);
  }
};

//Cancel reservation
const cancelReservation = async (req, res, next) => {
  const id = req.params.id;

  try {
    //check if reservation id is correct
    const reservation = await Reservation.findById(id).exec();
    if (!reservation)
      throw new ErrorHandler(
        404,
        `No reservation with id : ${id} is found in the database`
      );
    //check if the cancellation is allowed (can't cancel a ticket for today's show)
    const { date } = await Screening.findById(reservation.screeningId).exec();
    const screeningDate = new Date(date);
    const currentDate = new Date();
    if (currentDate.getDate() === screeningDate.getDate())
      throw new ErrorHandler(
        400,
        `Can't cancel reservation on the screening's day`
      );
    //delete reservation
    await Reservation.findOneAndDelete({ _id: id }).exec();
    //Free the seats
    const { seatIds } = reservation;
    await Seat.updateMany(
      { _id: { $in: seatIds } },
      { $set: { state: "free" } }
    ).exec();

    res.status(200).json({
      success: true,
      message: `Reservation ${id} was cancelled with success`,
    });
  } catch (error) {
    next(error);
  }
};
//Get all reservations
const getAllReservations = async (req, res, next) => {
  try {
    const data = await Reservation.find({}).exec();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
//Get reservations Id
const getReservationById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const reservation = await Reservation.findById(id).exec();
    if (!reservation)
      throw new ErrorHandler(
        404,
        `No reservation with id : ${id} is found in the database`
      );
    res.status(200).json({
      success: true,
      reservation,
    });
  } catch (error) {
    next(error);
  }
};
//Get filtered reservations
const getFilteredReservations = async (req, res, next) => {
  const query = req.query;

  try {
    const reservation = await Reservation.find(query).exec();
    if (reservation.length === 0)
      throw new ErrorHandler(
        404,
        `No reservation with this query is found in the database`
      );
    res.status(200).json({
      success: true,
      reservation,
    });
  } catch (error) {
    next(error);
  }
};

//
const getReservationNumber = async () => {
  const reservationsCount = await Reservation.countDocuments().exec();
  const reservationNumber = reservationsCount + 1;
  return reservationNumber;
};

module.exports = {
  createReservation,
  cancelReservation,
  getAllReservations,
  getReservationById,
  getFilteredReservations,
};
