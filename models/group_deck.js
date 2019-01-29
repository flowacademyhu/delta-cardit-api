'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group_Deck = sequelize.define('Group_Deck', {
    groupId: DataTypes.INTEGER,
    deckId: DataTypes.INTEGER
  }, {});
  Group_Deck.associate = function(models) {
    // associations can be defined here
  };
  return Group_Deck;
};