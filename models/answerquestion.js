'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnswerQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  AnswerQuestion.init({
    customerId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    reviewId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    answer: DataTypes.STRING,
    question: DataTypes.STRING,
    visibility:DataTypes.BOOLEAN,
    answerCreatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'AnswerQuestion',
  });
  return AnswerQuestion;
};