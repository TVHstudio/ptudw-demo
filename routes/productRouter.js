const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');
const brandController = require('../controllers/brandController');
const colorController = require('../controllers/colorController');

router.get('/', (req,res,next) => {   
    categoryController.getAll()
    .then(data => {
        res.locals.categories = data;        
        return brandController.getAll();
    })
    .then(data => {
        res.locals.brands = data;
        return colorController.getAll();
    })
    .then(data => {
        res.locals.topProducts = data;
        return productController.getTopProducts();
    })
    .then(data => {
        res.locals.products = data;
        return productController.getAllProducts();
    })
    .then(data => {
        res.locals.colors = data;       
        res.render('category'); 
    })                
     
    .catch(error => next(error));
});

module.exports = router;