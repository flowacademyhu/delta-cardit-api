'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      unique: true,
      validate: { "len": [3,500] }
    },
  }, {});
  Group.associate = function (models) {
    Group.hasMany(models.User);
    Group.hasMany(models.Group_Deck);
  };
  return Group;
};