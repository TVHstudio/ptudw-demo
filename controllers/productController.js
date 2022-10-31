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
        let product;
        Product
        .findOne({
            where: {id : id},
            include : [{model : models.Category}]
        })
        .then(result => {
            product = result;
            return models.ProductSpecification.findAll({
                where: { productId : id},
                include : [{ model : models.Specification }]
            });
        })
        .then(ProductSpecifications => {
            product.ProductSpecifications = ProductSpecifications;
            return models.Comment.findAll({
                where: { productId : id, parentCommentId: null },
                include : [{ model : models.User },
                    {
                        model : models.Comment,
                        as : 'SubComments',
                        include : [{ model : models.User }]
                    }                
                ]
            });            
        })
        .then(comments => {
            product.comments =comments;
            resolve(product);
        })

        .catch(error => reject(new Error(error)));
    });
};

module.exports = controller;