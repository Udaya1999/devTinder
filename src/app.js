const express = require("express");
const colors = require("colors");
const connectDB = require("./config/dataBase");
const app = express();

connectDB().then(()=>{
  console.log("db connected successfully ...!");
  app.listen(3000, () => {
    console.log(colors.rainbow("Dev-Server started......!!"));
  });  
}).catch((err)=>{
  console.error("db is not connected");
});





// git init
// >> git commit -m "second commit"
// >> git branch -M main
// >> git remote add origin https://github.com/Udaya1999/devTinder.git
// >> git push -u origin main
