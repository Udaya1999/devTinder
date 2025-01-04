const express = require("express");
const colors = require("colors");
const connectDB = require("./config/dataBase");
const app = express();
const User = require("./models/user");
const { Error } = require("mongoose");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  // const user =new User( {
  //   firstName : "ram",
  //   lastName : "kumar",
  //   emailId: "ram@gmail.com",
  //   password : "ram@123",
  // })
  // creating new instance of user model
  //const user = new User(userObj);

  try {
    await user.save();
    res.send("user created");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
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
