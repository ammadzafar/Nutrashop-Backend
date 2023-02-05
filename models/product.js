'use strict';

const {
    Model
} = require('sequelize');

const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Product.init({
        name: DataTypes.STRING,
        slug: {type: DataTypes.STRING, unique: true, allowNull: false},
        description: DataTypes.TEXT,
        brandId: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        sku: DataTypes.STRING,
        price: DataTypes.DOUBLE,
        stock: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        stockStatus: {
            type: DataTypes.ENUM,
            values: ['in_stock', 'out_of_stock', 'stock_back']
        },
        visibility: DataTypes.BOOLEAN,
        regularPrice: DataTypes.DOUBLE,
        seo_title: DataTypes.STRING,
        seo_description: DataTypes.STRING,
        seo_keywords: DataTypes.STRING,
        isPopular: DataTypes.BOOLEAN,
    }, {

        sequelize,
        modelName: 'Product',
    });
    return Product;
};
