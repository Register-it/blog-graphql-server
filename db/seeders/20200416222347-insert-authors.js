'use strict';

const createdAt = new Date(), 
      updatedAt = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('authors', [
      {
        image: 'https://robohash.org/example1',
        displayName: 'spyna',
        createdAt,
        updatedAt
      },
      {
        image: 'https://robohash.org/example4',
        displayName: 'pixel',
        createdAt,
        updatedAt
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('authors', null, {});
  }
};
