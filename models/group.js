'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      // allowNull: false,
      notEmpty: true,
      validate: { 'len': [3, 500] }
    }
  }, {});
  Group.associate = function (models) {
    Group.hasMany(models.User, { foreignKey: 'GroupId' });
    Group.hasMany(models.Group_Deck, { foreignKey: 'GroupId' });
  };
  return Group;
};
