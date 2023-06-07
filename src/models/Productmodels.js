const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String,
}, {
    timestamps: true,
    version: false
})

const products = mongoose.model('products', productsSchema);

module.exports = products;