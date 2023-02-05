'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AnswerQuestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Customers',
          },
          key: 'id'
        },
        allowNull: false
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Products',
          },
          key: 'id'
        },
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id'
        },
        allowNull: true,
      },
      reviewId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Reviews',
          },
          key: 'id'
        },
        allowNull: true,
      },
      answer: {
        allowNull:true,
        type: Sequelize.STRING
      },
      question: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      answerCreatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      visibility:{
        allowNull:true,
        type: Sequelize.BOOLEAN,
        defaultValue:true
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
    await queryInterface.dropTable('AnswerQuestions');
  }
};