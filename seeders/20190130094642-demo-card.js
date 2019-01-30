'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Cards', [{
        question: 'Mi a Flow Academy jelmondata?',
        answer: 'Tudás élmények útján',
        difficulty: 1,
        type: 'szabadszavas',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cards', null, {});
  }
};
