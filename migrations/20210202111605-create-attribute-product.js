'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AttributeProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('AttributeProducts');
  }
};
