'use strict';
module.exports = {

  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Attributes', 'slug', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Attributes');
  }
};