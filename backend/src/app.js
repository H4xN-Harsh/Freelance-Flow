const express = require('express');
const authRouter = require('./features/auth/auth.routes');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const limiter = rateLimit({
    windowMs:15*60*1000,
    max:100
});

const app = express();
app.use(express.json());
app.use(limiter);
app.use(helmet());
app.use('/api/auth',authRouter);
module.exports = app;