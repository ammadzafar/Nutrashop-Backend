'use strict';
const {
  Model
} = require('sequelize');
const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
  class CollectionProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CollectionProducts.init({
    collectionId:{type:DataTypes.INTEGER,allowNull:false},
    productId:{type:DataTypes.INTEGER},
  }, {
    sequelize,
    modelName: 'CollectionProducts',
  });
  return CollectionProducts;
};
