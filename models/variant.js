'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Variant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Variant.init({
    name: DataTypes.STRING,
    stock:DataTypes.INTEGER,
    status: {
      type:DataTypes.ENUM,
      values: ['in_stock', 'not_available', 'stock_back'],
      defaultValue: 'not_available'
    },
    price: DataTypes.INTEGER,
    sku: DataTypes.STRING,
    productId:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Variant',
  });
  return Variant;
};