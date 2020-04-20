'use strict';

const createdAt = new Date(), 
      updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const posts = await queryInterface.sequelize.query(
      `select * from posts`, { type: Sequelize.QueryTypes.SELECT }
    );

    const authors = await queryInterface.sequelize.query(
      `select * from authors`, { type: Sequelize.QueryTypes.SELECT }
    );

    return queryInterface.bulkInsert('comments', [
      {
        postId: posts[0].id,
        authorId: authors.find(x => x.displayName == 'Bob').id,
        content: "Great article! Thank you!",
        date: new Date(),
        createdAt,
        updatedAt
      },
      {
        postId: posts[0].id,
        authorId: authors.find(x => x.displayName == 'Pac Man').id,
        content: "Are you kidding me? You just wrote Lorem ipsum!",
        date: new Date(),
        createdAt,
        updatedAt
      },
      {
        postId: posts[1].id,
        authorId: authors.find(x => x.displayName == 'Jake Borrow').id,
        content: "I'd do it in a different way...",
        date: new Date(),
        createdAt,
        updatedAt
      },
      {
        postId: posts[1].id,
        authorId: authors.find(x => x.displayName == 'Alice Liddel').id,
        content: "The secret is the BBQ sauce!",
        date: new Date(),
        createdAt,
        updatedAt
      },
      {
        postId: posts[2].id,
        authorId: authors.find(x => x.displayName == 'Jake Borrow').id,
        content: "I wrote by myself a similar server, without using Apollo...and it works far better than this!",
        date: new Date(),
        createdAt,
        updatedAt
      },
      {
        postId: posts[2].id,
        authorId: authors.find(x => x.displayName == 'Spyna').id,
        content: "Are you still working on the server? C'mon! Hurry up!",
        date: new Date(),
        createdAt,
        updatedAt
      },
      {
        postId: posts[2].id,
        authorId: authors.find(x => x.displayName == 'Pac Man').id,
        content: "Is it really useful? I've always did it another way...",
        date: new Date(),
        createdAt,
        updatedAt
      },
      {
        postId: posts[3].id,
        authorId: authors.find(x => x.displayName == 'Pac Man').id,
        content: "Does anybody read this thing?!?",
        date: new Date(),
        createdAt,
        updatedAt
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('comments', null, {});
  }
};
