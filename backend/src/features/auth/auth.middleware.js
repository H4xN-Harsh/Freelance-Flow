const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const userModel = require('./auth.model');

const protect = async(req,res,next)=>{
    try{
        const token = req.headers.authorization?.split(' ')[1];
        if(!token)return res.status(401).json({message:"No token providers"});
        const decoded = jwt.verify(token,config.ACCESS_TOKEN);
        const user = await userModel.findById(decoded.id);
        if(!user)return res.status(401).json({message:"user not Found!"});
        req.user = user;
        next();
    }catch(err){
        return res.status(401).json({message:"Not Authorized!"});
    }
}
module.exports = protect;