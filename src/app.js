const express = require("express");
const colors = require("colors");
const app = express();

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});

app.get("/getAllUsers", (req, res) => {
  // console.log("getAllUsers");
  // res.status(200).send("get all users")
  throw new Error("svnfjv");
  // res.send("dbyddhidj")
});
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});

app.listen(3000, () => {
  console.log(colors.rainbow("Dev-Server started......!!"));
});

// git init
// >> git commit -m "second commit"
// >> git branch -M main
// >> git remote add origin https://github.com/Udaya1999/devTinder.git
// >> git push -u origin main
