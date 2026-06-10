const dotenv = require('dotenv');
dotenv.config();
if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI isn't defined in env variable !");
}
if(!process.env.ACCESS_TOKEN){
    throw new Error("jwt secret isn't defined in env variable !");
}
if(!process.env.REFRESH_TOKEN){
    throw new Error("jwt secret isn't defined in env variable !");
}
if(!process.env.EMAIL){
    throw new Error("EMAIL isn't defined in env variable !");

}
if(!process.env.EMAIL_PASSWORD){
    throw new Error("email password  isn't defined in env variable !");

}
if(!process.env.CLIENT_URL){
    throw new Error("client url  isn't defined in env variable !");

}

const config = {
    MONGO_URI:process.env.MONGO_URI,
    ACCESS_TOKEN:process.env.ACCESS_TOKEN,
    REFRESH_TOKEN:process.env.REFRESH_TOKEN,
    EMAIL:process.env.EMAIL,
    EMAIL_PASSWORD:process.env.EMAIL_PASSWORD,
    CLIENT_URL:process.env.CLIENT_URL
}
module.exports = config;