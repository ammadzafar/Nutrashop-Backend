'use strict';
const {DataTypes} = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Variants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Products',
          },
          key: 'id'
        },
        allowNull: false
      },
      price: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,

      },
      sku: {
        type: DataTypes.STRING,

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
    await queryInterface.dropTable('Variants');
  }
};
