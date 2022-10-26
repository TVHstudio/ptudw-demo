const controller = {};
const models = require('../models');
const Product = models.Product;

controller.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        Product.findAll()
        .then(data => resolve(data))
        .catch(error => reject(new Error(error)));
    } )
}

controller.getTopProducts = () => {
    return new Promise((resolve, reject) => {
        Product.findAll({
            limit: 12,
            order:[
                ['overallReview','DESC']
            ]
        })
        .then(data => {
            let topProducts = [];
            while (data.length) {
                topProducts.push(data.splice(0, 3));
            }
            resolve(topProducts);
        })
        .catch(error => reject(new Error(error)));
    } )
}


module.exports = controller;