const express = require('express');
const router = express.Router();
const { home } = require('../controllers/productControllers');


Router.use('/', home)

module.exports = Router;
