'use strict';
const {
    Model
} = require('sequelize');
const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    class OrderVariants extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    OrderVariants.init({
        orderId: DataTypes.INTEGER,
        variantId: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'OrderVariants',
    });
    return OrderVariants;
};