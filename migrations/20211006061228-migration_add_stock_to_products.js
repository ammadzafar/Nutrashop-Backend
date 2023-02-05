'use strict';
module.exports = {

    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Products', 'stock', {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Products');
    }
};