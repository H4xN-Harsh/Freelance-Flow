const express = require('express');
const authController = require('./auth.controller');
const router = express.Router();

router.post('/register',authController.register);
router.post('/login',authController.login);
router.get('/verify-email',authController.verifyEmail)
router.put('/logut',authController.logout);
router.delete('/deleteAccount',authController.deleteAccount)
module.exports = router