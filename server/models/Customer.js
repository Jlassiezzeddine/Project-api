const crypto = require("crypto");
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const customerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name"],
    },
    userName: {
      type: String,
      required: [true, "Please provide a  username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please provide a valid email",
      ],
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
        "Please provide a valid phone number",
      ],
    },
    adress: { type: String },
    town: { type: String },
    city: { type: String },
    reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
    preferences: {
      location: { type: String, default: "Tunis", required: true },
      genres: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
    },
    favourites: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
  },
  { timestamps: true }
);

//Hash Password on Register
customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Match Passwords
customerSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};
//Get Signed Token
customerSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Generate

customerSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
  return resetToken;
};
const Customer = model("Customer", customerSchema);
module.exports = Customer;
