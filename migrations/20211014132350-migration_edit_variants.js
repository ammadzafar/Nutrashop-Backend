'use strict';
module.exports = {

    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Variants', 'stock', {
            type: Sequelize.INTEGER.UNSIGNED,
            defaultValue: 0
        });
        await queryInterface.addColumn('Variants', 'status', {
            type: Sequelize.ENUM,
            values: ['in_stock', 'not_available', 'stock_back'],
            defaultValue: 'not_available'
        });
        await queryInterface.changeColumn('Variants', 'productId', {
            type: Sequelize.INTEGER,
            references: {
                model: {
                    tableName: 'Products',
                },
                key: 'id'
            },
            allowNull: false,
            onDelete: 'CASCADE'
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Variants');
    }
};