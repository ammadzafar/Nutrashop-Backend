'use strict';
module.exports = {

    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Variants', 'name', {
            type: Sequelize.STRING,
            allowNull: false
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Variants');
    }
};