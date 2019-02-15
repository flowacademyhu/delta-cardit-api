'use strict';
module.exports = (sequelize, DataTypes) => {
  const Deck = sequelize.define('Deck', {
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      unique: true,
      validate: { "len": [3,500] },
    },
  }, {});
  Deck.associate = function (models) {
    Deck.hasMany(models.Group_Deck, { foreignKey: 'DeckId' });
    Deck.hasMany(models.Card_Deck, { foreignKey: 'DeckId' });
  };
  return Deck;
};
