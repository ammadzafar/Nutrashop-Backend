'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CollectionProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      collectionId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Collections',
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
    await queryInterface.dropTable('CollectionProducts');
  }
};
