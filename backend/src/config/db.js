const mongoose = require('mongoose');
const config = require('./config');
const connectDB =async()=>{
    try{
        await mongoose.connect(config.MONGO_URI)
        console.log("Database connection established! ")
    }catch(err){
        console.error(err);
        process.exit(1)
    }
}
module.exports = connectDB;