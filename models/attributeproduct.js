'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AttributeProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  AttributeProduct.init({
    attributeId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'AttributeProduct',
  });
  return AttributeProduct;
};