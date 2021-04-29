const ErrorHandler = require("../helpers/errorHandler");
const Seat = require("../models/Seat");

const createSeat = async (req, res, next) => {
  const { seatNumber, seatRow, seatColumn, roomId } = req.body;
  try {
    const seatExist = await Seat.findOne({
      $or: [
        { seatNumber, roomId },
        { seatRow, seatColumn, roomId },
      ],
    });
    if (seatExist) throw new ErrorHandler(400, `Seat already exist!`);
    const seat = await Seat.create({ seatNumber, seatRow, seatColumn, roomId });

    res.status(201).json({
      success: true,
      message: "Seat is created successfully",
      seat,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSeat = async (req, res, next) => {
  const id = req.params.id;

  try {
    //check if seat exists
    const seat = await Seat.findById(id).exec();
    if (!seat)
      throw new ErrorHandler(
        404,
        `No seat with id : ${id} is found in the database`
      );
    await Seat.findOneAndDelete({ _id: id }).exec();
    res.status(200).json({
      success: true,
      message: `Seat with id: ${id} was deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

const editSeat = async (req, res, next) => {
  const id = req.params.id;
  const { state } = req.body;

  try {
    //check if seat exists
    const seatExist = await Seat.findById(id).exec();
    if (!seatExist)
      throw new ErrorHandler(
        404,
        `No seat with id: ${id} is found in the database`
      );
    const seat = await Seat.findOneAndUpdate(
      { _id: id },
      { state },
      { new: true, runValidators: true }
    ).exec();
    res.status(200).json({
      success: true,
      message: `seat ${id} was updated successfully`,
      seat,
    });
  } catch (error) {
    next(error);
  }
};
const getAllSeats = async (req, res, next) => {
  try {
    const data = await Seat.find({});
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
const getfilteredSeats = async (req, res, next) => {
  const query = req.query;
  try {
    const data = await Seat.find(query);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
const getSeatById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const seat = await Seat.findById(id).exec();
    if (!seat)
      throw new ErrorHandler(
        404,
        `No seat with id: ${id} is found in the database`
      );
    res.status(200).json({
      success: true,
      seat,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSeat,
  deleteSeat,
  editSeat,
  getAllSeats,
  getfilteredSeats,
  getSeatById,
};
