const crypto = require("crypto");
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminSchema = new Schema(
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
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    phoneNumber: {
      type: String,
      match: [
        /((\+|00)216)?([2579][0-9]{7}|(3[012]|4[01]|8[0128])[0-9]{6}|42[16][0-9]{5})/,
        "Please provide a valide phone number",
      ],
    },
  },
  { timestamps: true }
);

//Hash Password on Register
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Match Passwords
adminSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//Get Signed Token
adminSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Generate

adminSchema.methods.getResetPasswordToken = function () {
  let resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
    console.log(this.resetPasswordToken)

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
  this.save() ; 
  return resetToken;
};

const Admin = model("Admin", adminSchema);
module.exports = Admin ; 
