'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Review.init({
    customerId:DataTypes.INTEGER,
    productId:DataTypes.INTEGER,
    rating:DataTypes.INTEGER,
    description:DataTypes.STRING,
    visibility:DataTypes.BOOLEAN,
    is_top:DataTypes.BOOLEAN,
    reviewTitle: DataTypes.STRING,
    orderVariantId:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};