const ErrorHandler = require("../helpers/errorHandler");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  if (err.code === 11000) {
    console.log(err);
    const message = `Duplicate Field Value : ${Object.keys(
      err.keyValue
    )} already taken`;
    error = new ErrorHandler(400, message);
  }
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorHandler(400, message);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};
module.exports = errorHandler;
