const userModel = require('./auth.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require('../../config/config')
module.exports = async function register(req,res){
    try{
        const {username,email,password,occupation} = req.body;
        const isAlreadyRegistered = await userModel.findOne({
            $or:[{username},{email}]
        })
        if(!isAlreadyRegistered){
            const hashedPassword = await bcrypt.hash(password,10);
            const user = await userModel.create({username,email,password:hashedPassword,occupation});
            const token = jwt.sign
        }else{
            res.status(409).json({message:"Username or Email already exist! "});
        }
    }catch(error){

    }
}