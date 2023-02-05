'use strict';
const {DataTypes} = require("sequelize");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Brands', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            slug: {
                type: Sequelize.STRING,
                unique: true
            },
            description: {
                allowNull: true,
                type: DataTypes.TEXT
            },
            image: {
                type: Sequelize.STRING
            },

            seo_title: {
                allowNull: true,
                type: Sequelize.STRING
            },
            seo_description: {
                allowNull: true,
                type: DataTypes.TEXT
            },
            seo_keywords: {
                allowNull: true,
                type: DataTypes.TEXT
            },
            isPopular:{
                allowNull:false,
                type:Sequelize.BOOLEAN,
                defaultValue:false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: DataTypes.NOW
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: DataTypes.NOW
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Brands');
    }
};
