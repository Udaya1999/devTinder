const adminAuth = (req,res ,next)=>{
    console.log("Admin auth is getting checked !!");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("UnAuthorized request");
    }else{
        next();
    }
    
};
const userAuth = (req,res ,next)=>{
    console.log("user Admin auth is getting checked !!");
    const token = "xyz";
    const isUserAuthorized = token === "xyz";
    if(!isUserAuthorized){
        res.status(401).send("UnAuthorized request");
    }else{
        next();
    }
    
};

module.exports={
    adminAuth,userAuth
}