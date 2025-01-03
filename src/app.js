const express = require("express");
const colors = require("colors");
const app = express();

app.get("/user", (req, res, next) => {
  console.log("Handler 1 !!");
  //res.send("Hello from handler 1");
  next();
}, 
(req, res) => {
    console.log("Handler 2 !!");
    res.send("Hello from handler 2");
});

app.listen(3000, () => {
  console.log(colors.rainbow("Dev-Server started......!!"));
});

// git init
// >> git commit -m "second commit"
// >> git branch -M main
// >> git remote add origin https://github.com/Udaya1999/devTinder.git
// >> git push -u origin main
