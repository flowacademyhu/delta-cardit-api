'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {});
  Group.associate = function (models) {
    Group.hasMany(models.User);
    Group.hasMany(models.Group_Deck);
  };
  return Group;
};