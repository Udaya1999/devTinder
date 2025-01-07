const express = require("express");
const userAuth = require("../middlewares/auth");
const ConnectionRequest = require("../middlewares/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      console.log("Request received");

      const fromUserId = req.user._id;
      console.log("From User ID:", fromUserId);
      const toUserId = req.params.toUserId;
      console.log("To User ID:", toUserId);
      const status = req.params.status;
      console.log("Status:", status);

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status: " + status });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not found" });
      }
      console.log("To User Found:", toUser);

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({
            message:" Connection request already exists",
          });
      }
      console.log("No existing connection request found");

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      console.log("Connection Request Sent:", data);
      res.send({
        message: req.user.firstName + " is " + status + " in " + toUser.firstName,
        data: data,
      });
    } catch (err) {
      console.log("Error in /request/send/:status/:toUserId:", err);
      res.status(400).send("ERROR: " + err.message);
    }
  }
);


module.exports = requestRouter;
