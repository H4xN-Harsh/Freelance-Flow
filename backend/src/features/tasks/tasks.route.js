const express = require('express');
const router = express.Router();
const { createTask, updateTask, getAllTask, deleteTask }=require('./tasks.controller');
const protect = require('../auth/auth.middleware');
router.post('/createTask',protect,createTask);
router.patch('/:id',protect,updateTask);
router.get('/getAllTasks',protect,getAllTask);
router.delete('/:id',protect,deleteTask);

module.exports = router;