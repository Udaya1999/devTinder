const express = require("express");
const colors = require("colors");
const connectDB = require("./config/dataBase");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);


  // const user =new User( {
  //   firstName : "ram",
  //   lastName : "kumar",
  //   emailId: "ram@gmail.com",
  //   password : "ram@123",
  // })
  // creating new instance of user model
  //const user = new User(userObj);

  try {
    await user.save();
    res.send("user created");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

app.get("/feed",async (req,res)=>{
  try{
    const users = await User.find({});
    res.send(users);

  }catch(err){

    res.status(400).send("something went wrong");

  }

});

app.delete("/user",async(req,res)=>{
  const userId = req.body.userId;
  try{
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully !")

  }catch (err){
    res.status(400).send("something went wrong");
  }
});

app.patch("/user",async(req,res)=>{
  const userId = req.body.userId;
  const data = req.body;
  try{
    const user = await User.findByIdAndUpdate({_id: userId}, data, );
    console.log(user);
    
    res.send("updated successfully !")

  }catch (err){
    res.status(400).send("something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("db connected successfully ...!");
    app.listen(3000, () => {
      console.log(colors.rainbow("Dev-Server started......!!"));
    });
  })
  .catch((err) => {
    console.error("db is not connected");
  });


