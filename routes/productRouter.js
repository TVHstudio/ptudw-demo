const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');
const brandController = require('../controllers/brandController');


router.get('/', (req,res,next) => {
    productController.getTopProducts()
    categoryController.getAll()
    brandController.getAll()
    .then(data => {
        res.locals.categories = data;
        return brandController.getAll();
    })
    .then(topProducts => {
        res.locals.topProducts = topProducts;
        return productController.getAllProducts();
    })
    .then(products => {
        res.locals.products = products;
        
        res.render('category');
    })
    .then(brands => {      
        res.locals.brands = data;
    })
    .catch(error => next(error));
});

module.exports = router;