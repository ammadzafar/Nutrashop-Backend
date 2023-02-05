'use strict';
const {
    Model
} = require('sequelize');

const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    class Address extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Address.init({
        label: DataTypes.STRING,
        state: DataTypes.STRING,
        city: DataTypes.STRING,
        address: DataTypes.TEXT,
        postal_code: DataTypes.STRING,
        customerId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Address',
    });
    return Address;
};