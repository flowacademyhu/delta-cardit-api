'use strict';
module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('Result', {
    userId: DataTypes.INTEGER,
    cardId: DataTypes.INTEGER,
    isCorrect: DataTypes.BOOLEAN
  }, {});
  Result.associate = function(models) {
    // associations can be defined here
  };
  return Result;
};