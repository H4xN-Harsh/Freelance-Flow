const router = require('express').Router();
const {getdashBoardData} = require('./dashboard.controller');
const protect = require('../auth/auth.middleware');

router.get('/overview',protect,getdashBoardData)
module.exports = router;
