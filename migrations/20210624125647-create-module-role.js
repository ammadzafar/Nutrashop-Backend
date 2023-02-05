'use strict';
const {DataTypes} = require("sequelize");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ModuleRoles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      moduleId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Modules',
          },
          key: 'id'
        },
        allowNull: false
      },
      roleId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Roles',
          },
          key: 'id'
        },
        allowNull: false
      },
      permission: {
        type: DataTypes.ENUM({
          values: ['read', 'write'],
        }),
        defaultValue:'read'
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
    await queryInterface.dropTable('ModuleRoles');
  }
};
