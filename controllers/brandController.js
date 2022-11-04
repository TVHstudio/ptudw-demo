const controller ={};
const { request, query } = require('express');
//const { reject } = require('lodash');
//const { promise } = require('selenium-webdriver');
const models = require('../models');
const { options } = require('../routes/productRouter');
var Brand = models.Brand;

controller.getAll = (query) => {
    return new Promise((resolve, reject) => {
        let options = {
            attributes: ['id','name', 'imagepath'],
            include: [{ 
                model : models.Product,
                attributes :['id'],
                where: {}
            }]          
        };
        if(query.category){
            options.include[0].where.categoryId = query.category;
        }
        Brand
        .findAll(options)
        .then(data => resolve(data))
        .catch(error => reject(new Error(error)));
    });
};


module.exports = controller;