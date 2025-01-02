const express = require("express");
const colors = require("colors");
const app = express();

app.use("/test", (req, res) => {
  // res.setEncoding("utf8 "); // Use a valid encoding
  res.send("Hello konka udaya bhaskar all the very best");
});
app.use("/hello", (req, res) => {
  // res.setEncoding("utf8 "); // Use a valid encoding
  res.send("Hello hello hello ");
});

app.listen(3000, () => {
  console.log(colors.rainbow("Dev-Server_started......!!"));
});

// git init
// >> git commit -m "second commit"
// >> git branch -M main
// >> git remote add origin https://github.com/Udaya1999/devTinder.git
// >> git push -u origin main
