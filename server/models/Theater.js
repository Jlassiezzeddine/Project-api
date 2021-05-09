const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const theaterSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please provide a Theater name"] },
  userName: {
    type: String,
    unique: true,
    required: [true, "Please provide a user name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 6,
    select: false,
  },
  resetPasswordToek: String,
  resetPasswordExpire: Date,
  phoneNumber: {
    type: String,
    match: [
      /((\+|00)216)?([2579][0-9]{7}|(3[012]|4[01]|8[0128])[0-9]{6}|42[16][0-9]{5})/,
      "Please provide a valide phone number",
    ],
  },
  adress: { type: String },
  town: { type: String },
  city: { type: String },
  zipcode: { type: Number },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  screenings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Screening" }],
});

//Methods bcrypt hash password, compare password ..
theaterSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Match Passwords
theaterSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//Get Signed Token
theaterSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Generate

theaterSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
  return resetToken;
};

const Theater = mongoose.model("Theater", theaterSchema);
module.exports = Theater;
