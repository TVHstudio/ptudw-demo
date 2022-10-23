'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsto(models.Category,{foreignKey: 'categoryId'});
      Product.belongsto(models.Brand,{foreignKey: 'brandId'});
      Product.hasMany(models.ProductColor,{foreignKey:'productId'});
      Product.hasMany(models.ProductSpecification,{foreignKey:'productId'});
      Product.hasMany(models.Comment,{foreignKey:'productId'});
      Product.hasMany(models.Review,{foreignKey:'productId'});
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    imagepath: DataTypes.TEXT,
    thumbnailpath: DataTypes.TEXT,
    availability: DataTypes.BOOLEAN,
    summary: DataTypes.TEXT,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};