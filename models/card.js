'use strict';
module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    difficulty: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {});
  Card.associate = function(models) {
    Card.hasMany(models.Result);
    Card.hasMany(models.Card_Deck);
  };
  return Card;
};