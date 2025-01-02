const express = require("express");
const colors = require("colors");
const app = express();
app.get("/user", (req, res) => {
  res.send({ FirstName: "uday", lastName: "konka" });
});
app.post("/user",((req,res)=>{
  //logic to save into db
  res.send("Data saved successfully !")
}));

app.patch("/user",(req,res)=>{
  //logic to update into db
  res.send("Data updated successfully for patch !")
});

app.delete("/user",(req,res)=>{
  //logic to delete into db
  res.send("Data deleted successfully for delete !")
})

app.use("/test", (req, res) => {
  // res.setEncoding("utf8 "); // Use a valid encoding
  res.send("Hello konka udaya bhaskar all the very best");
});

app.listen(3000, () => {
  console.log(colors.rainbow("Dev-Server_started......!!"));
});

// git init
// >> git commit -m "second commit"
// >> git branch -M main
// >> git remote add origin https://github.com/Udaya1999/devTinder.git
// >> git push -u origin main
