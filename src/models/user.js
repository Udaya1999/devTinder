const mongoose = require("mongoose");
const validator = require('validator');
const { trim } = require("validator");
const { default: isURL } = require("validator/lib/isURL");
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
      minLength: 4,
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
          throw new Error("Invalid Email Id"+ value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validator(value){
        if(!validator.isStrongPassword(value)){
            throw new Error("Enter a strong password "+ value)
        }
      }
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      validate(value) {
        if (!["Male", "Female", "Others"].includes(value)) {
          throw new Error("Invalid gender" );
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://tse3.mm.bing.net/th?id=OIP.w0TcjC4y9CxTrY3sitYa_AAAAA&pid=Api&P=0&h=180",
      validate(value) {
        if (!isURL(value)) {
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

module.exports = mongoose.model("user", userSchema);
