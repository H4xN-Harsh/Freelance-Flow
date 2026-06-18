const router = require('express').Router();
const {getdashBoardData} = require('./dashboard.controller');
const protect = require('../auth/auth.middleware');

router.get('/stats',protect,getdashBoardData)
module.exports = router;
