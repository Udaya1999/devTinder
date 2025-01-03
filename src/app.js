const express = require("express");
const colors = require("colors");
const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send("Hello Admin");
});

app.get("/user", userAuth, (req, res) => {
  res.send("Hello User");
});
app.post("/user/login", (req, res) => {
  res.send("Login Success");
});

app.listen(3000, () => {
  console.log(colors.rainbow("Dev-Server started......!!"));
});

// git init
// >> git commit -m "second commit"
// >> git branch -M main
// >> git remote add origin https://github.com/Udaya1999/devTinder.git
// >> git push -u origin main
