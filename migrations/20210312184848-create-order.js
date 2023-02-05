'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_no: {
        type: Sequelize.STRING
      },
      statusId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Statuses',
          },
          key: 'id'
        },
        allowNull: false
      },
      customerId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Customers',
          },
          key: 'id'
        },
        allowNull: true,
        onDelete:'SET NULL'
      },
      address: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Orders');
  }
};
