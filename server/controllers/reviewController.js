const Review = require("../models/Review");
const ErrorHandler = require("../helpers/errorHandler");
const createReview = async (req, res, next) => {
  const { customerId, movieId, theaterId, comment, rating } = req.body;

  try {
    const reviewExist = await Review.findOne({
      customerId,
      theaterId,
      movieId,
    });
    if (reviewExist) throw new ErrorHandler(404, `can't review twice`);
    const review = await Review.create({
      customerId,
      movieId,
      theaterId,
      comment,
      rating,
    });
    res.status(201).json({
      success: true,
      review,
    });
  } catch (error) {
    next(error);
  }
};
const editReview = async (req, res, next) => {
  const id = req.params.id;
  const { comment, rating } = req.body;

  try {
    const review = await Review.findById(id).exec();
    if (!review)
      throw new ErrorHandler(
        404,
        `no review with id: ${id} is found in the database`
      );
    const updatedReview = await Review.findOneAndUpdate(
      { _id: id },
      { comment, rating },
      { new: true, runValidators: true }
    ).exec();

    res.status(200).json({
      success: true,
      message: "Review was updated successfully",
      updatedReview,
    });
  } catch (error) {
    next(error);
  }
};
const deleteReview = async (req, res, next) => {
  const id = req.params.id;

  try {
    const review = await Review.findById(id).exec();
    if (!review)
      throw new ErrorHandler(
        404,
        `No review with id: ${id} is found in the database`
      );

    await Review.findByIdAndDelete(id).exec();
    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
const getReviews = async (req, res, next) => {
  try {
    const data = await Review.find({});
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
const getFilteredReviews = async (req, res, next) => {
  const query = req.query;
  try {
    const data = await Review.find(query);
    if (data.length === 0)
      throw new ErrorHandler(404, `No reviews matched the query`);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
const getReviewById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const review = await Review.findById(id).exec();
    if (!review)
      throw new ErrorHandler(
        404,
        `No review with id ${id} is found in the database`
      );
    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReview,
  editReview,
  deleteReview,
  getReviews,
  getFilteredReviews,
  getReviewById,
};
