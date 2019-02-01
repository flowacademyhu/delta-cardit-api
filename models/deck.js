'use strict';
module.exports = (sequelize, DataTypes) => {
  const Deck = sequelize.define('Deck', {
    subject: {
      type:DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      validate: { min: 3, max: 500 },
      notEmpty: true
    },
  }, {});
  Deck.associate = function(models) {
    Deck.hasMany(models.Group_Deck);
    Deck.hasMany(models.Card_Deck);
  };
  return Deck;
};