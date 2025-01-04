const mongoose = require("mongoose");
const userSchema = new  mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:20,
    },
    lastName:{
        type:String,
        minLength:10,
        maxLength:30,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,

        
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18,  
    },
    gender:{
        type:String,
        enum:["Male","Female","Other"],
        validate(value){
            if(!["Male","Female","Others"].includes(value)){
                throw new Error("Invalid gender");
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://tse3.mm.bing.net/th?id=OIP.w0TcjC4y9CxTrY3sitYa_AAAAA&pid=Api&P=0&h=180",
    },
    about:{
        type:String,
        default: "This is a default description about the user"
    },
    skills:{
        type:[String],
    }
},{ timestamps :true});

module.exports = mongoose.model("user",userSchema);
