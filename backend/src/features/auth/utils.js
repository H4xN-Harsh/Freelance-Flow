const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const transporter = require('../../config/emailConfig');
const generateAccessToken = (userId)=>{
    return jwt.sign({id:userId},config.ACCESS_TOKEN,{expiresIn:"20m"});
}
const generateRefreshToken = (userId)=>{
    return jwt.sign({id:userId},config.REFRESH_TOKEN,{expiresIn:"10d"});
}

const sendVerificationEmail = async (email,token)=>{
    const verificationUrl = `${config.CLIENT_URL}/api/auth/verify-email?token=${token}`;
    await transporter.sendMail({
        from:config.EMAIL,
        to:email,
        subject:'Verify your FreelanceFlow Account✅',
        html:`
            <h2>Welcome to FreelanceFlow!</h2>
            <p>Click the link below to verify your email:</p>
            <a href="${verificationUrl}">Verify Email</a>
            <p>This link expires in 24 hours.</p>
        `
    })
}

module.exports = {generateAccessToken,generateRefreshToken,sendVerificationEmail}