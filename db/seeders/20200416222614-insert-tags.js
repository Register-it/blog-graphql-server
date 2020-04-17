'use strict';

const createdAt = new Date(), 
      updatedAt = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tags', [
      {
        name: 'graphql',
        createdAt,
        updatedAt
      },
      {
        name: 'react',
        createdAt,
        updatedAt
      },
      {
        name: 'bbq',
        createdAt,
        updatedAt
      },
      {
        name: 'cooking',
        createdAt,
        updatedAt
      },
      {
        name: 'Apollo',
        createdAt,
        updatedAt
      },
      {
        name: 'client',
        createdAt,
        updatedAt
      },
      {
        name: 'server',
        createdAt,
        updatedAt
      },
      {
        name: 'nodejs',
        createdAt,
        updatedAt
      },
      {
        name: 'poetry',
        createdAt,
        updatedAt
      },
      {
        name: 'Italy',
        createdAt,
        updatedAt
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tags', null, {});
  }
};
