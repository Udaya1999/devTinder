const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const authenticationRouter = express.Router();

authenticationRouter.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);

    // Encrypt the password
    const { password, firstName, lastName, emailId, age } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    // New instance of the object
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
    });
    await user.save();
    res.send("User created");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

authenticationRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // Create a JWT token
      const token = await user.getJWT();

      // Add the token to cookie and send the response back to the user
      res.cookie("token", token);
      res.send("User logged in");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error logging in: " + err.message);
  }
});

authenticationRouter.post("/logout", async (req, res) => {
  res.cookie("token", null,{
    expires: new Date(Date.now()),
  });
  res.send("User logged out");

})

module.exports = authenticationRouter;
