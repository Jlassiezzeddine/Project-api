const jwt = require("jsonwebtoken");
const ErrorHandler = require("../helpers/errorHandler");
const Admin = require("../models/Admin");

exports.protectAdmin = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorHandler(401, "Not Authorized to acces this route"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findOne({ _id: decoded.id }).exec();

    if (!admin)
      return next(
        new ErrorHandler(404, "Unauthorized | No Admin found with this id")
      );

    req.admin = admin;
    next();
  } catch (error) {
    return next(new ErrorHandler(402, "Not Authorized to acces this route"));
  }
};
