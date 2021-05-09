const Discount = require("../models/Discount");
const ErrorHandler = require("../helpers/errorHandler");

const createDiscount = async (req, res, next) => {
  const { screeningId, discount_start, discount_end, percentage } = req.body;

  try {
    const discountExist = await Discount.findOne({ screeningId }).exec();
    if (discountExist)
      throw new ErrorHandler(
        400,
        `screening : ${screeningId} already have a discount`
      );
    const discount = await Discount.create({
      screeningId,
      discount_start,
      discount_end,
      percentage,
    });
    res.status(201).json({
      success: true,
      message: "Discount was created successfully",
      discount,
    });
  } catch (error) {
    next(error);
  }
};
const removeDiscount = async (req, res, next) => {
  const id = req.params.id;
  try {
    const discountExist = await Discount.findById(id).exec();
    if (!discountExist)
      throw new ErrorHandler(
        400,
        `No discount with id : ${id} is found in the database`
      );
    await Discount.findByIdAndDelete(id).exec();
    res.status(200).json({
      success: true,
      message: "Discount was deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
const editDiscount = async (req, res, next) => {
  const id = req.params.id;
  const { discount_start, discount_end, percentage } = req.body;

  try {
    const discountExist = await Discount.findById(id).exec();
    if (!discountExist)
      throw new ErrorHandler(
        400,
        `No discount with id : ${id} is found in the database`
      );
    const updatedDiscount = await Discount.findOneAndUpdate(
      { _id: id },
      { discount_start, discount_end, percentage },
      { new: true, runValidators: true }
    ).exec();
    res.status(200).json({
      success: true,
      message: "Discount was updated successfully",
      updatedDiscount,
    });
  } catch (error) {
    next(error);
  }
};
const getAllDiscounts = async (req, res, next) => {
  try {
    const data = await Discount.find({});
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
const getFilteredDiscounts = async (req, res, next) => {
  const query = req.query;

  try {
    const data = await Discount.find(query);
    if (!data) throw new ErrorHandler(404, "No discounts matched the query");
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
const getDiscountById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const discount = await Discount.findById(id).exec();
    if (!discount)
      throw new ErrorHandler(
        400,
        `No discount with id : ${id} is found in the database`
      );
    res.status(200).json({
      success: true,
      discount,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDiscount,
  removeDiscount,
  editDiscount,
  getAllDiscounts,
  getFilteredDiscounts,
  getDiscountById,
};
