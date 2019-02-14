'use strict';
module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    question: DataTypes.STRING,
    // {
    // type: DataTypes.STRING,
    // allowNull: false,
    // notEmpty: true,
    // validate: { 'len': [3, 500] }
    // },
    answer: DataTypes.STRING,
    // {
    // type: DataTypes.STRING,
    // allowNull: false,
    // notEmpty: true,
    // validate: { 'len': [3, 500] }
    // },
    difficulty: DataTypes.INTEGER,
    // {
    // type: DataTypes.INTEGER,
    // allowNull: false,
    // notEmpty: true,
    // validate: { min: 1, max: 3 }
    // },
    type: DataTypes.STRING
    // {
    // type: DataTypes.STRING,
    // allowNull: false,
    // notEmpty: true,
    // validate: { 'len': [3, 500] }
    // }
  }, {});
  Card.associate = function (models) {
    Card.hasMany(models.Result, { foreignKey: 'CardId' });
    Card.hasMany(models.Card_Deck, { foreignKey: 'CardId' });
  };
  return Card;
};
