const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema  = new Schema({
    clerkId:{
        type:String,
        required:true,
        unique:true
    },
    emailId:{
        type:String,
        required:true,
        unique:true
    },
    photo:{
        type:String,
        required:true,
    },
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
    },
    creditBalance:{
        type:Number,
        default:5
    }

})

const User = mongoose.model("User",userSchema)
module.exports  = User