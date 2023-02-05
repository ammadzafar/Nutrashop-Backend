'use strict';
const {
  Model
} = require('sequelize');
const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
  class OrderProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OrderProducts.init({
    orderId:DataTypes.INTEGER,
    productId:DataTypes.INTEGER,
    quantity:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'OrderProducts',
  });
  return OrderProducts;
};
