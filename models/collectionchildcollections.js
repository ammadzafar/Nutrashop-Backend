'use strict';
const {
    Model
} = require('sequelize');
const {DataTypes} = require('sequelize')
module.exports = (sequelize) => {
    class collectionChildCollections extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    collectionChildCollections.init({
        childCollectionId: {
            type: DataTypes.INTEGER,
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        },
        parentCollectionId: {
            type: DataTypes.INTEGER,
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }
    }, {
        sequelize,
        modelName: 'collectionChildCollections',
    });
    return collectionChildCollections;
};