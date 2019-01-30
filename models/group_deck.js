'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group_Deck = sequelize.define('Group_Deck', {
    GroupId: DataTypes.INTEGER,
    DeckId: DataTypes.INTEGER
  }, {});
  Group_Deck.associate = function(models) {
    Group_Deck.belongsTo(models.Group);
    Group_Deck.belongsTo(models.Deck);
  };
  return Group_Deck;
};