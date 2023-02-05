'use strict';
const {DataTypes} = require("sequelize");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      brandId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Brands',
          },
          key: 'id'
        },
        allowNull: false
      },
      name: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING,
        unique: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      callForPrice: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,

      },
      price: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,

      },
      regularPrice: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,

      },
      quantity:{
        type:DataTypes.INTEGER,
        defaultValue:0
      },
      stockStatus:{
        type:DataTypes.ENUM,
        values:['in_stock','out_of_stock','stock_back']
      },
      sku: {
        type: DataTypes.STRING,

      },
      barcode: {
        type: DataTypes.STRING,

      },
      visibility: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: '1 for published 0 for hidden'
      },
      seo_title: {
        allowNull: true,
        type: Sequelize.STRING
      },
      seo_description: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      seo_keywords: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      isPopular:{
        allowNull:false,
        type:Sequelize.BOOLEAN,
        defaultValue:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};
