'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AttributeValue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  AttributeValue.init({
    name: DataTypes.STRING,
    attributeId: DataTypes.INTEGER,
    slug:{type:DataTypes.STRING,unique:true,allowNull:false},
  }, {
    sequelize,
    modelName: 'AttributeValue',
  });
  return AttributeValue;
};
