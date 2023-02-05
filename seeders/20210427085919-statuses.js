'use strict';
const data = require('../data/statuses')
const db = require('../models');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        for (const status of data.statuses) {
            let st = await db.Status.findOne({where: {name: status.name}, raw: true});
            if (!st) {
               await queryInterface.bulkInsert('statuses', [status])
            }
        }
        return
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('statuses', null, {});
    }
};
