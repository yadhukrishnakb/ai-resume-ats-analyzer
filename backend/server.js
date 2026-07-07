const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const mongoose = require("mongoose")

const uploadRoutes = require("./routes/uploadRoutes")

const app = express()
app.use(express.json())
app.use(cors())

app.use("/",uploadRoutes)

const PORT = process.env.PORT || 3000

const startServer = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        app.listen(PORT,() => console.log(`Database connected and Server started at http://localhost:${PORT}`))
    }catch(err){
        console.log(`Database error ${err.message}`)
    }
}

startServer()

