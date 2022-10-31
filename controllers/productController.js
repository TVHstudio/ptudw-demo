const controller = {};
const models = require('../models');
const Product = models.Product;

controller.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        Product.findAll({
            include : [
                {model : models.Category}
                
            ], 
            attributes: ['id','name','imagepath','price']                       
        })
        .then(data => resolve(data))
        .catch(error => reject(new Error(error)));
    });
};

controller.getTopProducts = () => {
    return new Promise((resolve, reject) => {
        Product.findAll({
            limit: 12,
            order: [
                ['overallReview', 'DESC']
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
    });
};

controller.getTrendingProducts = () => {
    return new Promise((resolve, reject) => {
        Product.findAll({
            order : [
                ['overallReview', 'DESC']
            ],
            limit: 8,
            include : [
                {model : models.Category}
            ],
            attributes: ['id','name','imagepath','price']                       
        })
        .then(data => resolve(data))
        .catch(error => reject(new Error(error)));
    });
};

controller.getById = (id) => {
    return new Promise((resolve, reject) => {
        Product.findOne({
            where: {id : id},
            include : [{model : models.Category}]
        })
        .then(result => resolve(result))
        .catch(error => reject(new Error(error)));
    });
};

module.exports = controller;