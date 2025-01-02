const express = require("express");
const colors = require("colors");
const app = express();
app.get("/user/:userId/:name", (req, res) => {
  console.log(req.params);
  
  res.send({ FirstName: "uday", lastName: "konka" });
});

app.listen(3000, () => {
  console.log(colors.rainbow("Dev-Server_started......!!"));
});

// git init
// >> git commit -m "second commit"
// >> git branch -M main
// >> git remote add origin https://github.com/Udaya1999/devTinder.git
// >> git push -u origin main
