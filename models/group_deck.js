module.exports = (sequelize, DataTypes) => {
  const Group_Deck = sequelize.define('Group_Deck', {
    GroupId: DataTypes.INTEGER,
    DeckId: DataTypes.INTEGER
  }, {});
  Group_Deck.associate = function (models) {
    Group_Deck.belongsTo(models.Group, { foreignKey: 'GroupId' });
    Group_Deck.belongsTo(models.Deck, { foreignKey: 'DeckId' });
  };
  return Group_Deck;
};
