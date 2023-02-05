'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CouponDiscount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CouponDiscount.init({
    discountName: DataTypes.STRING,
    discount: DataTypes.STRING,
    expirationDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CouponDiscount',
  });
  return CouponDiscount;
};