'use strict';
const {
  Model
} = require('sequelize');
const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
  class Collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Collection.init({
    collectionId: DataTypes.BIGINT,
    name: DataTypes.STRING,
    slug:{type:DataTypes.STRING,unique:true,allowNull:false},
    visibility:{type:DataTypes.BOOLEAN,defaultValue:1},
    description:DataTypes.TEXT,
    image: DataTypes.STRING,
    seo_title: DataTypes.STRING,
    seo_description: DataTypes.TEXT,
    seo_keywords: DataTypes.TEXT,
    isPopular:DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Collection',
  });
  return Collection;
};
