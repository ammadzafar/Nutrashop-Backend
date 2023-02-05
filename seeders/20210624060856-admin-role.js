'use strict';
const db = require('../models');
module.exports = {
    up: async (queryInterface, Sequelize) => {
        let adminRole = await db.Role.findOne({where: {name: 'admin'}, raw: true});
        if(!adminRole){
            return await queryInterface.bulkInsert('Roles', [{
                name: 'admin',
                slug: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            }], {});

        }

    },

    down: async (queryInterface, Sequelize) => {

     await queryInterface.bulkDelete('Roles', null, {});
    }
};
