const mongoose = require("mongoose");
const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://udaykonka:NUffZg59x1xKHK0J@uday.gjlrg.mongodb.net/devTinder")
};
module.exports = connectDB;

