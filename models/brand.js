'use strict';
const {
  Model
} = require('sequelize');

const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Brand.init({
    name: DataTypes.STRING,
    slug:{type:DataTypes.STRING,unique:true,allowNull:false},
    description:DataTypes.TEXT,
    image: DataTypes.STRING,
    seo_title: DataTypes.STRING,
    seo_description: DataTypes.TEXT,
    seo_keywords: DataTypes.TEXT,
    isPopular:DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Brand',
  });
  return Brand;
};
