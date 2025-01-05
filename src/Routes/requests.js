const express = require("express");
const userAuth = require("../middlewares/auth");

const requesRouter = express.Router();

requesRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("Sending a connection request");
  res.send(`${user.firstName} sent you a Connection Request`);
});

module.exports = requesRouter;
