const express = require('express');
const authRouter = require('./features/auth/auth.routes');

const app = express();
app.use(express.json());
app.use('/api/auth',authRouter);
module.exports = app;