'use strict';
const {
  Model
} = require('sequelize');
const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
  class ModuleRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ModuleRole.init({
    roleId:{type:DataTypes.INTEGER,allowNull:false},
    moduleId:{type:DataTypes.INTEGER},
    permission: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'ModuleRole',
  });
  return ModuleRole;
};
