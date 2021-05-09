const Screening = require("../models/Screening");
const ErrorHandler = require("../helpers/errorHandler");
const { findById, find } = require("../models/Screening");
//Create Screening
const createScreening = async (req, res, next) => {
  const { date, startTime, endTime, price, movieId, roomId } = req.body;

  try {
    //check if screening already exists in the same room same date same time
    const screeningExsit = await Screening.findOne({
      date,
      startTime,
      roomId,
    }).exec();
    if (screeningExsit)
      throw new ErrorHandler(
        400,
        `A screening already exists in room ${roomId}, on ${date}, at ${startTime}`
      );
    const screening = await Screening.create({
      date,
      startTime,
      endTime,
      price,
      movieId,
      roomId,
    });
    res.status(201).json({
      success: true,
      message: "Screening created successfully",
      screening,
    });
  } catch (error) {
    next(error);
  }
};

//Edit Screening
const editScreening = async (req, res, next) => {
  const id = req.params.id;

  try {
    //check if screening exist
    const screeningExist = await Screening.findById(id);
    if (!screeningExist)
      throw new ErrorHandler(
        404,
        `No screening with id : ${id} is found in the database`
      );

    const updatedScreening = await Screening.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true, runValidators: true }
    ).exec();
    res.status(200).json({
      success: true,
      message: "Screening updated successfully",
      updatedScreening,
    });
  } catch (error) {
    next(error);
  }
};

//Remove Screening
const deleteScreening = async (req, res, next) => {
  const id = req.params.id;

  try {
    //check if the screening exist
    const screeningExist = await Screening.findById(id);
    if (!screeningExist)
      throw new ErrorHandler(
        400,
        `No screening with id : ${id} is found in the database`
      );

    await Screening.findOneAndDelete({ _id: id }).exec();
    res.status(200).json({
      success: true,
      message: "Screening was deleted with success",
    });
  } catch (error) {
    next(error);
  }
};
//Publish Screening
const publishScreening = async (req, res, next) => {
  const id = req.params.id;

  try {
    //check if screening exist
    const screeningExist = await Screening.findById(id);
    if (!screeningExist)
      throw new ErrorHandler(
        404,
        `No screening with id : ${id} is found in the database`
      );
    const publishedScreening = await Screening.findOneAndUpdate(
      { _id: id },
      { $set: { published: true } },
      { new: true, runValidators: true }
    ).exec();
    res.status(200).json({
      success: true,
      message: "Screening was published with success",
      publishedScreening,
    });
  } catch (error) {
    next(error);
  }
};

//Get All Screenings
const getAllScreenings = async (req, res, next) => {
  try {
    const screenings = await Screening.find({}).exec();
    res.status(200).json({
      success: true,
      screenings,
    });
  } catch (error) {
    next(error);
  }
};
//Get Screening by id
const getScreeningById = async (req, res, next) => {
  const id = req.params.id;

  try {
    //check if screening exist
    const screeningExist = await Screening.findById(id);
    if (!screeningExist)
      throw new ErrorHandler(
        404,
        `No screening with id : ${id} is found in the database`
      );

    const screening = await Screening.findById(id);
    res.status(200).json({
      success: true,
      screening,
    });
  } catch (error) {
    next(error);
  }
};
//Get screening by movie
const getScreeningsByMovie = async (req, res, next) => {
  const movieId = req.params.movieId;

  try {
    const screenings = await Screening.find({ movieId }).exec();
    if (!screenings)
      throw new ErrorHandler(404, `no screenings for movie : ${movieId}`);
    res.status(200).json({
      success: true,
      message: `screenings for movie : ${movieId} were retrieved with success`,
      screenings,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createScreening,
  editScreening,
  deleteScreening,
  publishScreening,
  getAllScreenings,
  getScreeningById,
  getScreeningsByMovie,
};
