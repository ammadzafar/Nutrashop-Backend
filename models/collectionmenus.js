'use strict';


const {
  Model
} = require('sequelize');

const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
  class collectionMenus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  collectionMenus.init({
    collectionId:{type:DataTypes.INTEGER,allowNull:false},
    menuId:{type:DataTypes.INTEGER},
  }, {
    sequelize,
    modelName: 'collectionMenus',
  });
  return collectionMenus;
};
