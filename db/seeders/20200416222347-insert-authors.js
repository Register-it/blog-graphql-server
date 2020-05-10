'use strict';

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('authors', [
      {
        image: 'https://robohash.org/example1',
        displayName: 'Spyna',
        createdAt,
        updatedAt,
      },
      {
        image: 'https://robohash.org/example4',
        displayName: 'Pixel',
        createdAt,
        updatedAt,
      },
      {
        image: 'https://robohash.org/jake',
        displayName: 'Jake Borrow',
        createdAt,
        updatedAt,
      },
      {
        image: 'https://robohash.org/pacman',
        displayName: 'Pac Man',
        createdAt,
        updatedAt,
      },
      {
        image: 'https://robohash.org/alice',
        displayName: 'Alice Liddel',
        createdAt,
        updatedAt,
      },
      {
        image: 'https://robohash.org/bob',
        displayName: 'Bob',
        createdAt,
        updatedAt,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('authors', null, {});
  },
};
