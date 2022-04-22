const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path : './config/.env'})

// MONGODB CONNECTION
const connectDB = () => {
    mongoose.connect(
        'mongodb://localhost:27017/user-auth' || process.env.MONGO_URI,
        {
            useNewUrlParser: true
}).then(() => {
    console.log("DB CONNECTION SUCCESSFUL")
}).catch(() => {
    console.log("DB CONNECTION UNSUCCESSFUL")
})}

module.exports = connectDB;