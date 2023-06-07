const express = require('express');
const app = express();
const Router = require('./src/routes/api');

// Import all Middlewares
const bodyParser = require('body-parser');
const cokiesParser = require('cookie-parser');
const cors = require('cors');

// Import Security Middlewares
const helmet = require('helmet');
const xssClean = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const rateLimiter = require('express-rate-limit')

// Use all middlewares
app.use(express.static('public'))
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(mongoSanitize())
app.use(xssClean())
app.use(hpp())

// Experss rate Limiter
const { rateLimit } = rateLimiter;
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

app.use('/v1/api', Router)

module.exports = app;