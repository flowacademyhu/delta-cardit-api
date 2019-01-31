'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false
    },
    passwordHash: {
      type:DataTypes.STRING,
      allowNull: false
    },
    role: {
      type:DataTypes.STRING,
      allowNull: false
    },
    lastLogin: DataTypes.DATE,
    GroupId: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Result);
    User.belongsTo(models.Group);
  };
  return User;
};