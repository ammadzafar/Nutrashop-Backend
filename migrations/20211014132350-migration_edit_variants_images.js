'use strict';
module.exports = {

    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('VariantImages', 'variantId', {
            type: Sequelize.INTEGER,
            references: {
                model: {
                    tableName: 'Variants',
                },
                key: 'id'
            },
            allowNull: false,
            onDelete: 'CASCADE'
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('VariantImages');
    }
};