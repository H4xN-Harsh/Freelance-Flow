const dotenv = require('dotenv');
dotenv.config();
if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI isn't defined in env variable !");
}
if(!process.env.JWT_SECRET){
    throw new Error("jwt secret isn't defined in env variable !");
}
const config = {
    MONGO_URI:process.env.MONGO_URI,
    JWT_SECRET:process.env.JWT_SECRET
}
module.exports = config;