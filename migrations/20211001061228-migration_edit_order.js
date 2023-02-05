'use strict';
module.exports = {

    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Orders', 'amount', {
            type: Sequelize.INTEGER.UNSIGNED
        });
        await queryInterface.addColumn('Orders', 'type', {
            type: Sequelize.ENUM,
            values: ['qisstpay', 'cash_on_delivery'],
            defaultValue: 'cash_on_delivery',
        });
        await queryInterface.addColumn('Orders', 'qisstpayOrderId', {
            type: Sequelize.STRING,
            allowNull: true
        });
        await queryInterface.addColumn('Orders', 'paymentStatus', {
            type: Sequelize.ENUM,
            values: ['unpaid', 'paid', 'incomplete'],
            defaultValue: 'incomplete',
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Orders');
    }
};