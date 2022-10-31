const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');


router.get('/', (req,res) => {
    productController.getTopProducts()
    categoryController.getAll()
    .then(data => {
        res.locals.categories = data;
    })
    .then(topProducts => {
        res.locals.topProducts = topProducts;
        return productController.getAllProducts();
    })
    .then(products => {
        res.locals.products = products;
        res.render('category');
    })
});

module.exports = router;