'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'comments',
      'authorId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'authors',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'comments',
      'authorId'
    );
  }
};
