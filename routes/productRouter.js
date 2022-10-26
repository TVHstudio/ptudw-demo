const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', (req,res) => {
    productController.getTopProducts()
    .then(topProducts => {
        res.locals.topProducts = topProducts;
        res.render('category');
    });
});

module.exports = router;