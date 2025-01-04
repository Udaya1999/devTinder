const express = require("express");
const colors = require("colors");
const connectDB = require("./config/dataBase");
const app = express();
const User = require("./models/user");
const { Error } = require("mongoose");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignUpData(req);

    //encript the password
    const { password, firstName, lastName, emailId,age } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    // new instance of the object
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
    });
    await user.save();
    res.send("user created");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("User logged in");
      console.log(user);
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error logging in: " + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully !");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  console.log(userId);

  const data = req.body;
  console.log(data);

  // validation on api level ....
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    // validation for skills array..
    if (data.skills.lenght > 10) {
      throw new Error("skills can't be more than 10");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    console.log(user);

    res.send("updated successfully !");
  } catch (err) {
    res.status(400).send("update failed: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("db connected successfully ...!");
    app.listen(3000, () => {
      console.log(colors.rainbow("Dev-Server started......!!"));
    });
  })
  .catch((err) => {
    console.error("db is not connected");
  });
