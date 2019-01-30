'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING
  }, {});
  Group.associate = function(models) {
    Group.hasMany(models.User);
    Group.hasMany(models.Group_Deck);
  };
  return Group;
};