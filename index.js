const mongoose = require("mongoose")
const express = require("express")
const connectDB = require("./connection/DB")
const app = express()

const cookieParser = require("cookie-parser")
const cors = require("cors")
const dotenv = require("dotenv")

// Importing routes
const userRoutes = require("./routes/routes")

dotenv.config({path: './config/.env'})

// connecting to the mongodb instance
connectDB()

// Initilaizing middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors())

//  using routing
app.use('/api', userRoutes)

// server setup
const PORT = 3001 || process.env.PORT

app.listen(PORT, () => {
    console.info(`Server is running on: http://localhost:${PORT}`)
})