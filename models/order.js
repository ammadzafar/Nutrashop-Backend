'use strict';
const {
  Model
} = require('sequelize');
const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Order.init({
    order_no: DataTypes.STRING,
    statusId:DataTypes.INTEGER,
    customerId:DataTypes.INTEGER,
    dc_charges:DataTypes.INTEGER,
    address: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    consignment_num: DataTypes.STRING,
    amount: DataTypes.INTEGER.UNSIGNED,
    type: {
      type: DataTypes.ENUM,
      values: ['qisstpay', 'cash_on_delivery'],
      defaultValue: 'cash_on_delivery',
    },
    qisstpayOrderId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    paymentStatus: {
      type: DataTypes.ENUM,
      values: ['unpaid', 'paid', 'incomplete']
    },
    isSeen:{
      type:DataTypes.BOOLEAN,
      defaultValue:0
    },
    booking:{
      type:DataTypes.BOOLEAN,
      defaultValue:0
    },

  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
