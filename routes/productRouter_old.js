const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', (req,res) => {
    productController.getTopProducts()
    .then(topProducts => {
        res.locals.topProducts = topProducts;
        return productController.getAllProducts();
    })
    .then(products => {
        res.locals.products = products;
        res.render('category');
    })
});


.then(data => {
    res.locals.topProducts = data;
    let productController = require('../controllers/productController');  
    return productController.getTopProducts();
})

module.exports = router;


