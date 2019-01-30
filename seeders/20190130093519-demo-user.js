'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@admin.com',
        passwordHash: 1234567,
        role: 'admin',
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
