'use strict';
const {
    Model
} = require('sequelize');
const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    class Customer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Customer.init({
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        phone: DataTypes.STRING,
        email: {type: DataTypes.STRING, unique: true},
        password:{type: DataTypes.STRING}
    }, {
        sequelize,
        modelName: 'Customer',
    });
    return Customer;
};
