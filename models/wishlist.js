'use strict';
const {
  Model
} = require('sequelize');
const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Wishlist.init({
    productId:{type:DataTypes.INTEGER},
    customerId:{type:DataTypes.INTEGER},

  }, {
    sequelize,
    modelName: 'Wishlist',
  });
  return Wishlist;
};
