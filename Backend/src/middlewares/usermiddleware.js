const jwt = require("jsonwebtoken")

const UserMiddleware = async(req, res)=>{
   try {
     const {token} = req.headers
     if(!token){
        res.json({
            success:false,
            message:("Not Authorised login again")
        })
     }
     const tokenDecoded = jwt.decode(token)
     req.body.clerkId = tokenDecoded.clerkId

     next();

   } catch (error) {
    res.json({
        success:false,
        message:error.message
    })
   }
}

module.exports = UserMiddleware