const validator = require("validator")

const validateSignUpData = (req)=>{
    const {firstName, lastName, emailId, password,age} = req.body;
    if(!firstName || !lastName){
        throw new Error("Nameis not valid");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");

    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("please enter strong password");

    }
    else if(age < 18){
        throw new Error("Require 18+");
    }
}
module.exports = {
    validateSignUpData
}