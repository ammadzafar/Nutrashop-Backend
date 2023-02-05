'use strict';
const {DataTypes} = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('VariantValues', {
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
      VariantId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Variants',
          },
          key: 'id'
        },
        allowNull: false
      },
      attributeId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Attributes',
          },
          key: 'id'
        },
        allowNull: false
      },
      valueId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'AttributeValues',
          },
          key: 'id'
        },
        allowNull: false
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
    await queryInterface.dropTable('VariantValues');
  }
};
