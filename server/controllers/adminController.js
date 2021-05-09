const ErrorHandler = require("../helpers/errorHandler");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const getAll = async (req, res, next) => {
  try {
    const data = await Admin.find({}).exec();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getAdminById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await Admin.findOne({ _id: id }).exec();
    if (!data)
      throw new ErrorHandler(
        404,
        `No Admin with id : '${id}' is found in the database`
      );
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const editAdmin = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  try {
    adminExist = await Admin.findOne({ _id: id }).exec();
    if (!adminExist)
      throw new ErrorHandler(
        404,
        `No Admin with id : '${id}' is found in the database`
      );
    await Admin.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { runValidators: true }
    ).exec();
    data = await Admin.findOne({ _id: id }).exec();
    res.status(200).json({
      success: true,
      message: `Admin with id :${id} has been edited successfully`,
      data,
    });
  } catch (error) {
    next(error);
  }
};
const resetPassword = async (req, res, next) => {
  const id = req.params.id;
  const pwd = req.body.password;

  try {
    adminExist = await Admin.findOne({ _id: id }).exec();
    if (!adminExist)
      throw new ErrorHandler(
        404,
        `No Admin with id : '${id}' is found in the database`
      );
    if (pwd.length <= 6)
      throw new ErrorHandler(404, `password too short, minimum length : 6`);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pwd, salt);
    await Admin.findOneAndUpdate(
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
const deleteAdmin = async (req, res, next) => {
  const id = req.params.id;
  try {
    const adminExist = await Admin.findOne({ _id: id }).exec();
    if (!adminExist)
      throw new ErrorHandler(
        404,
        `No Admin with id : '${id}' is found in the database`
      );
    await Admin.findOneAndDelete({ _id: id }).exec();
    res.status(200).json({
      success: true,
      message: `Admin with id :${id} has been deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getAdminById,
  editAdmin,
  deleteAdmin,
  resetPassword,
};
