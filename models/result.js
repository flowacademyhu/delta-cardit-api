'use strict';
module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('Result', {
    UserId: DataTypes.INTEGER,
    CardId: DataTypes.INTEGER,
    isCorrect: DataTypes.BOOLEAN
  }, {});
  Result.associate = function(models) {
    Result.belongsTo(models.User);
    Result.belongsTo(models.Card);
  };
  return Result;
};