'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CouponDiscountProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CouponDiscountProducts.init({
    discountCouponId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    expired: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'CouponDiscountProducts',
  });
  return CouponDiscountProducts;
};