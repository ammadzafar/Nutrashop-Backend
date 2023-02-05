'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Addresses', {
            id: {
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            label: {
                type: Sequelize.STRING,
            },
            state: {
                type: Sequelize.STRING,
            },
            city: {
                type: Sequelize.STRING,
            },
            address: {
                type: Sequelize.TEXT,
            },
            postal_code: {
                type: Sequelize.STRING,
            },
            customerId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'Customers'
                    },
                    key: 'id'
                },
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Addresses');
    }
};
