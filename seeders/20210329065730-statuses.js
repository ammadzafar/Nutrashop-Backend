'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     * name: 'John Doe',
     * isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert('Statuses', [
      {
        name: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'verified',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'cancelled',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'refund',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'delivered',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'in_transit',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Statuses', null, {});
  }
};