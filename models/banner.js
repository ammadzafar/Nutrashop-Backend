'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Banner.init({
    image: DataTypes.STRING,
    mobileImage: {type:DataTypes.STRING,allowNull:true},
    isFeatured:{type:DataTypes.BOOLEAN,defaultValue:0},
    slug:{type:DataTypes.STRING,allowNull:true},
    placeholder:{type:DataTypes.STRING,unique:true,allowNull:true},
    collectionId:{type:DataTypes.INTEGER,allowNull:true},
    productId:{type:DataTypes.INTEGER,allowNull:true},
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};