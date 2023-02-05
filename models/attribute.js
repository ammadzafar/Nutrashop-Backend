'use strict';
const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Attribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Attribute.init({
    name: DataTypes.STRING,
    slug:{type:DataTypes.STRING,unique:true,allowNull:false},
  }, {
    sequelize,
    modelName: 'Attribute',
  });
  return Attribute;
};
