'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VariantImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  VariantImage.init({
    path: DataTypes.STRING,
    variantId: {type:DataTypes.INTEGER},
  }, {
    sequelize,
    modelName: 'VariantImage',
  });
  return VariantImage;
};