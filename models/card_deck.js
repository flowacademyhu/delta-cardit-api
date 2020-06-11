module.exports = (sequelize, DataTypes) => {
  const Card_Deck = sequelize.define('Card_Deck', {
    CardId: DataTypes.INTEGER,
    DeckId: DataTypes.INTEGER
  }, {});
  Card_Deck.associate = function (models) {
    Card_Deck.belongsTo(models.Card, { foreignKey: 'CardId' });
    Card_Deck.belongsTo(models.Deck, { foreignKey: 'DeckId' });
  };
  return Card_Deck;
};
