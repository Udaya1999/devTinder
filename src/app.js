const express = require("express");
const colors = require("colors");
const app = express();

app.use("/test", (req, res) => {
  // res.setEncoding("utf8 "); // Use a valid encoding
  res.send("Hello konka udaya bhaskar all the very best");
});

app.listen(3000, () => {
  console.log(colors.rainbow("Dev-Server_started......!!"));
});
