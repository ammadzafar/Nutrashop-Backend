'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Banners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      mobileImage: {
        type: Sequelize.STRING,
        allowNull:true
      },
      slug: {
        type: Sequelize.STRING,
        allowNull:true
      },
      
      placeholder: {
        type: Sequelize.STRING,
        unique:true,
        allowNull:true
      },
      isFeatured: {
        type: Sequelize.BOOLEAN,
        defaultValue:0,
      },
      collectionId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Collections',
          },
          key: 'id'
        },
        allowNull:true
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Products',
          },
          key: 'id'
        },
        allowNull:true
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
    await queryInterface.dropTable('Banners');
  }
};