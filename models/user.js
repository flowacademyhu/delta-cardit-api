'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    role: DataTypes.STRING,
    lastLogin: DataTypes.DATE,
    GroupId: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Result);
    User.belongsTo(models.Group);
  };
  return User;
};