const express = require('express');
const router = express.Router();
const { createInvoice, getAllInvoice, updateInvoice, deleteInvoice } = require('./invoice.controller');
const protect = require('../auth/auth.middleware');
router.post('/createInvoice',protect,createInvoice);
router.get('/allInvoices',protect,getAllInvoice);
router.patch('/:id',protect,updateInvoice);
router.delete('/:id',protect,deleteInvoice);

module.exports = router;