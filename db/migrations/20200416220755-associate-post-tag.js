'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'postTags',
      {
        postId: {
          type: Sequelize.INTEGER,
          primaryKey: true
        },
        tagId: {
          type: Sequelize.INTEGER,
          primaryKey: true
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }  
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('postTags');
  }
};
