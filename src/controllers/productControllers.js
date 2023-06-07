// Import Product Model
const Products = require('../models/Productmodels');

// api home page
exports.home = (req, res, next) => {
    res.status(200).json({msg: "Home Page"})
}

// Get All products
exports.products = async (req, res, next) => {
    const query = {};
    const projection = {
        __v: 0,
        updatedAt: 0,
        description: 0,
        createdAt: 0,
        _id: 0
    }
    await Products.find(query, projection)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

// Add single product
exports.addProduct = async (req, res, next) => {
    let produtData = req.body;

    await Products.create(produtData)
        .then((data)=> {
            res.status(201).json({
                "status code": "201",
                message: "Product Created",
                data: data
            })
        })
        .catch((err)  => {
            res.status(500).json({
                "status code": "500 ",
                message: "File Created failed",
                error: err
            })
        })
}