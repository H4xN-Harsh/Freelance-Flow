const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username:{
        type:String,required:true,unique:true
    },email:{
        type:String,required:true,unique:true
    },password:{
        type:String,required:true,select:false
    },occupation:{
        type:String,
    },refreshToken:{
        type:String
    },isVerified:{
        type:Boolean,default:false
    },verificationToken:{
        type:String
    },verificationTokenExpiry:{
        type:Date
    }
},{timestamps:true});
const User = mongoose.model('User',userSchema);
module.exports = User
