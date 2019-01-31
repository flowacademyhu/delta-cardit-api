'use strict';
module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('Result', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CardId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  }, {});
  Result.associate = function(models) {
    Result.belongsTo(models.User);
    Result.belongsTo(models.Card);
  };
  return Result;
};