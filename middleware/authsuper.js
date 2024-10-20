const jwt = require("jsonwebtoken");
const SECRETE_KEY = "PLACEMENT";

const authSuperM = (req,res,next)=>{
    const token= req.header("auth-token");
    if(!token){
        res.send("token not found");
    } 
    try{
console.log(token , "token")
const superMid = jwt.verify(token,SECRETE_KEY)
        req.super = superMid;
        next();
    }catch(err){

        console.log(err)

    }
};

module.exports = authSuperM;