'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('collectionChildCollections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      childCollectionId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Collections',
          },
          key: 'id',
        },
        allowNull: false,
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
      parentCollectionId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Collections',
          },
          key: 'id',
        },
        allowNull: false,
        onDelete:"CASCADE",
        onUpdate: "CASCADE"
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
    await queryInterface.dropTable('collectionChildCollections');
  }
};