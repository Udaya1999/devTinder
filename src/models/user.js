const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 20,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 20,
    },
    emailId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Id: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password: " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    photoUrl: {
      type: String,
      default:
        "https://tse3.mm.bing.net/th?id=OIP.w0TcjC4y9CxTrY3sitYa_AAAAA&pid=Api&P=0&h=180",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo URL...");
        }
      },
    },
    about: {
      type: String,
      default: "This is a default description about the user",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "UDAY@Tinder$209", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passInpUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(passInpUser, passwordHash); // Use passInpUser variable
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema); // Export as User
