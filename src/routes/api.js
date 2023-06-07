const express = require('express');
const router = express.Router();
const {home, products, addProduct} = require('../controllers/productControllers');

// Home page
router.get('/', home);

// Get All products
router.get('/products', products);

// Post Singe Product
router.post('/products', addProduct)

module.exports = router;
