'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      validate: { min: 3, max: 500,
      isAlpha: true },
      notEmpty: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      validate: { min: 3, max: 500 },
      isAlpha: true,
      notEmpty: true
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      validate: { min: 3, max: 500 },
      isEmail: true,
      notEmpty: true
    },
    passwordHash: {
      type:DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      validate: { min: 3, max: 500 },
      notEmpty: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      validate: { min: 3, max: 500 },
      notEmpty: true
    },
    lastLogin: {
      type: DataTypes.DATE,
      isDate: true
    },
      GroupId: DataTypes.INTEGER,
      isDate: true
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Result);
    User.belongsTo(models.Group);
  };
  return User;
};