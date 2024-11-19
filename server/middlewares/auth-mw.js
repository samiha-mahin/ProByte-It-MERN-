const jwt = require ("jsonwebtoken");
const User= require ('../models/user-model');
const { user } = require("../router/auth-router");

const authMiddleware = async (req,res,next) =>{
    const token = req.header("Authorization");

    if(!token){
        return res
        .status (401)
        .json ({message : "Unauthorized HTTP,Token not Provided"});
    }

    const jwtToken = token.replace("Bearer ","") ;
    console.log("token from auth mw",token);

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_KEY )
      
        const userData = await User.findOne({email: isVerified.email}).select({
            password : 0,
        });

          console.log(userData);
          req.user = userData;
          req.token = token;
          req.userID = userData._id

       next();  
    } catch (error) {
        return res.status (401).json ({message : "Unauthorized HTTP,Token not Provided"});
    }

   
}

module.exports = authMiddleware;