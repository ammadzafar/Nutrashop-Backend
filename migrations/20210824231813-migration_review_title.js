'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     // * Add altering commands here.
     // *
     // * Example:
      await queryInterface.addColumn('Reviews','reviewTitle', {
          type: Sequelize.STRING,
          allowNull: true,
      });

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
