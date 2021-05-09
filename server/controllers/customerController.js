const ErrorHandler = require("../helpers/errorHandler");
const Customer = require("../models/Customer");
const bcrypt = require("bcrypt");


const getAll = async (req, res, next) => {
  try {
    const data = await Customer.find({}).exec();
    const count = await Customer.countDocuments({}).exec();
    res.status(200).json({
      success: true,
      count,
      data,
    });
  } catch (error) {
    next(error);
  }
};
const getcustomerById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const customer = await checkedCustomer(id);
    res.status(200).json({
      success: true,
      customer,
    });
  } catch (error) {
    next(error);
  }
};
const editCustomer = async (req, res, next) => {
  const id = req.params.id;

  try {
    await checkedCustomer(id);
    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true, runValidators: true }
    ).exec();
    res.status(200).json({
      success: true,
      message: `Customer with id : ${id} has been edited successfully`,
      updatedCustomer,
    });
  } catch (error) {
    next(error);
  }
};
const resetPassword = async (req, res, next) => {
  const id = req.params.id;
  const pwd = req.body.password;

  try {
    const customerExist = await Customer.findOne({ _id: id }).exec();
    if (!customerExist)
      return next(
        new ErrorHandler(
          404,
          `No Customer with id : '${id}' is found in the database`
        )
      );
    if (pwd.length <= 6)
      return next(
        new ErrorHandler(404, `password too short, minimum length : 6`)
      );
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pwd, salt);
    await Customer.findOneAndUpdate(
      { _id: id },
      { $set: { password: hashedPassword } },
      { runValidators: true }
    )
      .select("password")
      .exec();
    res.status(200).json({
      succces: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    next(error);
  }
};
const deleteCustomer = async (req, res, next) => {
  const id = req.params.id;
  try {
    const customerExist = await Customer.findOne({ _id: id }).exec();
    if (!customerExist)
      return next(
        new ErrorHandler(
          404,
          `No Customer with id : '${id}' is found in the database`
        )
      );
    await Customer.findOneAndDelete({ _id: id }).exec();
    res.status(200).json({
      success: true,
      message: `Customer with id :${id} has been deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

//Favourites
const getFavourites = async (req, res, next) => {
  const id = req.params.id;

  try {
    const customer = await checkedCustomer(id);
    const favourites = customer.favourites;
    const count = favourites.length;
    res.status(200).json({
      success: true,
      count,
      favourites,
    });
  } catch (error) {
    next(error);
  }
};
const addFavourite = async (req, res, next) => {
  const id = req.params.id;
  const movieId = req.params.movieId;
  try {
    const existantCustomer = await checkedCustomer(id);

    //Check if Favourite movie already exists
    const movieId_DB = existantCustomer.favourites.find((e) => e == movieId);
    if (movieId_DB)
      throw new ErrorHandler(404, `movie ${movieId} already exist`);

    const customer = await Customer.findOneAndUpdate(
      { _id: id },
      { $push: { favourites: movieId } },
      {
        runValidators: true,
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: `${movieId} added successfully to favourites`,
      customer,
    });
  } catch (error) {
    next(error);
  }
};
const removeFavourite = async (req, res, next) => {
  const id = req.params.id;
  const movieId = req.params.movieId;
  try {
    const existantCustomer = await checkedCustomer(id);
    //Check if Favourite movie already exists
    const movieId_DB = existantCustomer.favourites.find((e) => e == movieId);
    if (!movieId_DB)
      throw new ErrorHandler(
        404,
        `movie ${movieId} doesn't exist in favourites`
      );
    const customer = await Customer.findOneAndUpdate(
      { _id: id },
      { $pull: { favourites: movieId } },
      {
        runValidators: true,
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: `${movieId} removed successfully to favourites`,
      customer,
    });
  } catch (error) {
    next(error);
  }
};

//Preferences
const getPreferences = async (req, res, next) => {
  id = req.params.id;
  try {
    const customer = await Customer.findOne({ _id: id }).exec();
    if (!customer)
      return next(
        new ErrorHandler(
          404,
          `No Customer with id : '${id}' is found in the database`
        )
      );
    const preferences = customer.preferences;
    res.status(200).json({
      success: true,
      preferences,
    });
  } catch (error) {
    next(error);
  }
};
const setPreferences = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  try {
    await checkedCustomer(id);

    const customer = await Customer.findOneAndUpdate(
      { _id: id },
      { $set: { preferences: body } },
      {
        runValidators: true,
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: `Preferences updated successfully`,
      customer,
    });
  } catch (error) {
    next(error);
  }
};

//Check Customer and return it
const checkedCustomer = async (id) => {
  const customer = await Customer.findOne({ _id: id }).exec();

  if (!customer)
    throw new ErrorHandler(
      404,
      `No Customer with id : '${id}' is found in the database`
    );

  return customer;
};

module.exports = {
  getAll,
  getcustomerById,
  editCustomer,
  resetPassword,
  deleteCustomer,
  getFavourites,
  addFavourite,
  removeFavourite,
  setPreferences,
  getPreferences,
};

