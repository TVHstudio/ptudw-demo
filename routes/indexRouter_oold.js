const express = require('express');
const { nextTick } = require('process');
const router = express.Router();
const categoryController = require('../controllers/productController');

router.get('/', (req,res) => {
    categoryController
    .getAll()
    .then(data => {
        res.locals.categories = data;
        res.render('index');
    })
    .catch(error => nextTick(error));
});

module.exports = router;