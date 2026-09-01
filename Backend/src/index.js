const express = require("express")
require('dotenv').config()
const cors = require("cors")
const main = require("./config/db")

const app = express()
app.use(express.json())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


const iniatilizeConnection = async()=>{

    try {
        // db connection and other connection
          await main()
        console.log("MongoDB is connected")

        app.listen(process.env.LISTENING_PORT,()=>{
        console.log("Listening at port 3000 ")
})
    } catch (error) {
        console.log("Error Occured in connecting")
    }

}

iniatilizeConnection()
