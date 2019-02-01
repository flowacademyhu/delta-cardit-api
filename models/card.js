'use strict';
module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      validate: { min: 3, max: 500 }
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      validate: { min: 3, max: 500 }
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      validate: { min: 3, max: 500 }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      validate: { min: 3, max: 500 }
    },
  }, {});
  Card.associate = function(models) {
    Card.hasMany(models.Result);
    Card.hasMany(models.Card_Deck);
  };
  return Card;
};