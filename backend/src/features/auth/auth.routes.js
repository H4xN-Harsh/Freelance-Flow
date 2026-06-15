const express = require('express');
const userModel = require('./auth.model')
const authController = require('./auth.controller');
const router = express.Router();
const protect = require('./auth.middleware');
router.post('/refresh', authController.refreshAccessToken)
router.post('/register',authController.register);
router.post('/login',authController.login);
router.get('/verify-email',authController.verifyEmail)
router.post('/logout',authController.logout);
router.delete('/deleteAccount',authController.deleteAccount);
router.get('/me',protect,async(req,res)=>{
    const user = await userModel.findById(req.user._id).select('-refreshToken -password')
    res.json({user});
})
module.exports = router