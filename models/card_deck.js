'use strict';
module.exports = (sequelize, DataTypes) => {
  const Card_Deck = sequelize.define('Card_Deck', {
    cardId: DataTypes.INTEGER,
    deckId: DataTypes.INTEGER
  }, {});
  Card_Deck.associate = function(models) {
    Card_Deck.belongsTo(models.Card);
    Card_Deck.belongsTo(models.Deck);
  };
  return Card_Deck;
};