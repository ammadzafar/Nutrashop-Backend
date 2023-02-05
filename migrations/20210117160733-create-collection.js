'use strict';
const {DataTypes} = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Collections', {
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
        allowNull: true
      },
      name: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING,
        unique: true
      },
      description: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      image: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Collections');
  }
};
