module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      validate: { len: [3, 500] }
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      validate: { len: [3, 500] }
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      validate: { min: 1, max: 3 }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      validate: { len: [3, 500] }
    }
  }, {});
  Card.associate = function (models) {
    Card.hasMany(models.Result, { foreignKey: 'CardId' });
    Card.hasMany(models.Card_Deck, { foreignKey: 'CardId' });
  };
  return Card;
};
