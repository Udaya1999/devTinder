const express = require("express");
const colors = require("colors");
const connectDB = require("./config/dataBase");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const userAuth = require("./middlewares/auth");

app.use(express.json()); // middleware for json data
app.use(cookieParser()); // middleware for cookies (JWT - tokens...)

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("Sending a connection request");
  res.send(`${user.firstName} sent you a Connection Request`);
});

connectDB()
  .then(() => {
    console.log("DB connected successfully ...!");
    app.listen(3000, () => {
      console.log(colors.rainbow("Dev-Server started......!!"));
    });
  })
  .catch((err) => {
    console.error("DB is not connected");
  });
