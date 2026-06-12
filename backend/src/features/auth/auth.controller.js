const userModel = require("./auth.model");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const { generateAccessToken, generateRefreshToken,sendVerificationEmail } = require("./utils");
const register = async (req, res) => {
  try {
    const { username, email, password, occupation } = req.body;
    const isAlreadyRegistered = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (!isAlreadyRegistered) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationToken = crypto.randomBytes(32).toString('hex');
      const verificationTokenExpiry = Date.now()+24*60*60*1000;
      const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
        occupation,
        verificationToken,
        verificationTokenExpiry
      });
      const refreshToken = generateRefreshToken(user._id);
      const accessToken = generateAccessToken(user._id);
      
      user.refreshToken = refreshToken;
      await user.save();
      await sendVerificationEmail(email,verificationToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 10 * 24 * 60 * 60 * 1000,
      });
      res
        .status(201)
        .json({
          message: "user Registered Successfully!",
          
        });
    } else {
      res.status(409).json({ message: "Username or Email already exist! " });
    }
  } catch (error) {
    
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await userModel
      .findOne({
        $or: [{ email: identifier }, { username: identifier }],
      })
      .select("+password");
    if (user) {
      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (isCorrectPassword) {
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 10 * 24 * 60 * 60 * 1000,
        });
        return res
          .status(200)
          .json({
            message: "user logged in successfully",
            accessToken,
            user: { id: user._id },
          });
      } else {
        return res.status(401).json({ message: "invalid Password!" });
      }
    } else {
      return res.status(404).json({ message: "user not found! " });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
const verifyEmail = async (req,res)=>{
    try{
        const {token} = req.query;
        const user = await userModel.findOne({
            verificationToken:token,
            verificationTokenExpiry:{$gt:Date.now()}
        });
        if(!user){
            return res.status(400).json({message:"Invalid or expired Varification link!"})
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiry = undefined
        await user.save()
        res.status(200).json({message:"Email is verified Successfully! you can now login."})
    } catch (error) {
    
         return res.status(500).json({
          message: "Internal Server Error",
        });
    }
}
const logout = async (req,res)=>{
  try{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
      res.status(400).json({message:"User already Logged out"});
    }
    await userModel.findOneAndUpdate(
      {refreshToken},{refreshToken:null}
    )
    res.clearCookie('refreshToken',{
      httpOnly:true,secure:process.env.NODE_ENV==="production"
    })
    res.status(200).json({message:"user logged out successfully"});
  }catch(error){
    res.status(500).json({message:"internal server broken!"});
  }
}
const deleteAccount = async (req,res)=>{
  try{
    
  }catch(error){
    res.status(500).json({message:'internal server broked ! '})
  }
}
module.exports = { register ,login,verifyEmail,logout,deleteAccount};
