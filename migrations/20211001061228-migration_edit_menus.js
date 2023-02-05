'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Menus', 'menuCollection', {
      type: Sequelize.INTEGER,
      allowNull: true,
      onDelete:"SET NULL",
      references: {
        model: {
          tableName: 'Collections',
        },
        key: 'id'
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Menus');
  }
};