'use strict';
module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('Result', {
    userId: DataTypes.INTEGER,
    cardId: DataTypes.INTEGER,
    isCorrect: DataTypes.BOOLEAN
  }, {});
  Result.associate = function(models) {
    Result.belongsTo(models.User);
    Result.belongsTo(models.Card);
  };
  return Result;
};