const express = require("express");
const colors = require("colors");
const connectDB = require("./config/dataBase");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json()); // middleware for json data
app.use(cookieParser()); // middleware for cookies (JWT - tokens...)

const authenticationRouter = require("./Routes/authentication");
const requesRouter = require("./Routes/requests");
const profile = require("./Routes/profile");

app.use("/", authenticationRouter, profile, requesRouter)

connectDB()
  .then(() => {
    console.log("DB connected successfully ...!");
    app.listen(3000, () => {
      console.log(colors.rainbow("Dev-Server started......!!"));
    });
  })
  .catch((err) => {
    console.error("DB is not connected");
  });
