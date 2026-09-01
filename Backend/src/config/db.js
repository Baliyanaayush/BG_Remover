const mongoose = require("mongoose")

async function main (){
    await mongoose.connect(process.env.CONNECTING_STRING)
}
module.exports = main