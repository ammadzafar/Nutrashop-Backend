'use strict';
const {
    Model
} = require('sequelize');
const {DataTypes} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class attributesValuesVariants extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    attributesValuesVariants.init({
        attributeValueId: {type:DataTypes.INTEGER,allowNull:false},
        variantId: {type:DataTypes.INTEGER}
    }, {
        sequelize,
        modelName: 'attributesValuesVariants',
    });
    return attributesValuesVariants;
};