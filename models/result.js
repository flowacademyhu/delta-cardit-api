'use strict';
module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('Result', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true
    },
    CardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      notEmpty: true
    },
  }, {});
  Result.associate = function(models) {
    Result.belongsTo(models.User);
    Result.belongsTo(models.Card);
  };
  return Result;
};