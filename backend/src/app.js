const express = require('express');
const authRouter = require('./features/auth/auth.routes');
const clientRoute = require('./features/client/client.routes');
const taskRoute = require('./features/tasks/tasks.route');
const invoiceRoute = require('./features/invoice/invoice.route');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const limiter = rateLimit({
    windowMs:15*60*1000,
    max:100
});

const app = express();
app.use(express.json());
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use('/api/auth',authRouter);
app.use('/api/clients',clientRoute);
app.use('/api/tasks',taskRoute);
app.use('/api/invoice',invoiceRoute);
module.exports = app;