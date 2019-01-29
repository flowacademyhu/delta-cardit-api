'use strict';
module.exports = (sequelize, DataTypes) => {
  const Card_Deck = sequelize.define('Card_Deck', {
    cardId: DataTypes.INTEGER,
    deckId: DataTypes.INTEGER
  }, {});
  Card_Deck.associate = function(models) {
    // associations can be defined here
  };
  return Card_Deck;
};