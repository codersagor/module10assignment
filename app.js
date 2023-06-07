const express = require('express');
const app = express();
const router = require('./src/routes/api');
require('dotenv').config({path: "config.env"});

// Import all Middlewares
const bodyParser = require('body-parser');
require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose')

// Import Security Middlewares
const helmet = require('helmet');
const xssClean = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const rateLimiter = require('express-rate-limit')

// Use all middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }))
app.use(express.static('public'))
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(mongoSanitize())
app.use(xssClean())
app.use(hpp());

// Experss rate Limiter
const {rateLimit} = rateLimiter;
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);


// Connect database with Mongoose
const dbUri = process.env.DATABASE_URI;
const DBoptions = {
    user: "",
    pass: "",
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(dbUri, DBoptions)
    .then(() => {
        console.log(`Database Connected`)
    })
    .catch((err) => {
        console.log(`Database Connection Failed msg: ${err}`)
    })

app.use('/v1/api', router)
// Handle 404 Request
app.use('*', (req, res, next) => res.status(404).json({
    status: 404,
    msg: "Request not found"
}));

module.exports = app;