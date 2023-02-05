'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VariantValue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  VariantValue.init({
    name: DataTypes.STRING,
    productId:DataTypes.INTEGER,
    VariantId:DataTypes.INTEGER,
    attributeId:DataTypes.INTEGER,
    valueId:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'VariantValue',
  });
  return VariantValue;
};