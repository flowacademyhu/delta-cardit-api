'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      validate: {
        len: [3, 500],
        isAlpha: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      validate: {
        "len": [3, 500],
        isAlpha: true
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      defaultValue: null,
      unique: true,
      validate: {
        "len": [3, 500],
        isEmail: true
      }
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      defaultValue: null,
      validate: { "len": [3, 500] }
    },
    role: {
      type: DataTypes.ENUM('administrator', 'contributor', 'student'),
      allowNull: false,
      notEmpty: true,
      defaultValue: null,
      validate: { "len": [3, 500] },

    },
    lastLogin: {
      type: DataTypes.DATE,
      isDate: true,
      defaultValue: new Date()
    },
    GroupId: DataTypes.INTEGER
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Result);
    User.belongsTo(models.Group);
  };
  return User;
};