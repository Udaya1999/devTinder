const express = require("express");
const colors = require("colors");
const connectDB = require("./config/dataBase");
const app = express();
const User = require("./models/user");

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


// git init
// >> git commit -m "second commit"
// >> git branch -M main
// >> git remote add origin https://github.com/Udaya1999/devTinder.git
// >> git push -u origin main
