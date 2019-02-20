'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Admin',
      lastName: 'Admin',
      email: 'admin@admin.com',
      passwordHash: '$2a$10$g7ILhN6usXTJ56B3sOVbwuX4LLGwumdIzeAr4s0xHabLnfSJIaKSa',
      role: 'admin',
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Contributor',
      lastName: 'Contributor',
      email: 'contributor@contributor.com',
      passwordHash: '$2a$10$ViQk9igXBrBRC7xb4akODeHjqVncg6W1eh2zfEiBvzURmcNkpYY0S',
      role: 'contributor',
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Student',
      lastName: 'Student',
      email: 'student@student.com',
      passwordHash: '$2a$10$2c.mHdEV/eFgEthCZP0eM.DVlGC0qTozDfwoTjRl9vD.HkuPg.jHi',
      role: 'student',
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
