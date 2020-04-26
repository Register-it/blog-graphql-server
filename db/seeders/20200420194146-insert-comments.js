'use strict';

const createdAt = new Date(), 
      updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const posts = await queryInterface.sequelize.query(
      'select * from posts', { type: Sequelize.QueryTypes.SELECT }
    );

    const authors = await queryInterface.sequelize.query(
      'select * from authors', { type: Sequelize.QueryTypes.SELECT }
    );

    return queryInterface.bulkInsert('comments', [
      {
        postId: posts.find(x => x.title === 'Let\'s React to GraphQL!').id,
        authorId: authors.find(x => x.displayName == 'Bob').id,
        content: 'Great article! Thank you!',
        date: new Date('2020-02-29'),
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Let\'s React to GraphQL!').id,
        authorId: authors.find(x => x.displayName == 'Pac Man').id,
        content: 'Are you kidding me? You just wrote Lorem ipsum!',
        date: new Date('2020-02-21'),
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'BBQ Secrets').id,
        authorId: authors.find(x => x.displayName == 'Jake Borrow').id,
        content: 'I\'d do it in a different way...',
        date: new Date('2020-04-25'),
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'BBQ Secrets').id,
        authorId: authors.find(x => x.displayName == 'Alice Liddel').id,
        content: 'The secret is the BBQ sauce!',
        date: new Date('2020-04-30'),
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Climb on Apollo\'s chariot').id,
        authorId: authors.find(x => x.displayName == 'Jake Borrow').id,
        content: 'I wrote by myself a similar server, without using Apollo...and it works far better than this!',
        date: new Date('2020-03-27'),
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Climb on Apollo\'s chariot').id,
        authorId: authors.find(x => x.displayName == 'Spyna').id,
        content: 'Are you still working on the server? C\'mon! Hurry up!',
        date: new Date('2020-03-31'),
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Climb on Apollo\'s chariot').id,
        authorId: authors.find(x => x.displayName == 'Pac Man').id,
        content: 'Is it really useful? I\'ve always did it another way...',
        date: new Date('2020-03-28'),
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'And sweet to me is sinking in this sea').id,
        authorId: authors.find(x => x.displayName == 'Pac Man').id,
        content: 'Does anybody read this thing?!?',
        date: new Date('2020-01-31'),
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'A happy new year of code!').id,
        authorId: authors.find(x => x.displayName == 'Pac Man').id,
        content: 'Best wishes!',
        date: new Date('2020-01-01'),
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'A happy new year of code!').id,
        authorId: authors.find(x => x.displayName == 'Alice Liddel').id,
        content: 'All the best!',
        date: new Date('2020-01-01'),
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Hook!').id,
        authorId: authors.find(x => x.displayName == 'Jake Borrow').id,
        content: 'Let\'s imagine to have a completely different application written in a completely different language. Do you think that this thing can work in the same way in that situation?',
        date: new Date('2020-01-31'),
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Hook!').id,
        authorId: authors.find(x => x.displayName == 'Alice Liddel').id,
        content: 'Really interesting. Can you please share a working example on GitHub?',
        date: new Date('2020-02-04'),
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Hook!').id,
        authorId: authors.find(x => x.displayName == 'Pac Man').id,
        content: 'Very good article, but I\'d never use it in a real system',
        date: new Date('2020-02-06'),
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Indoor coding').id,
        authorId: authors.find(x => x.displayName == 'Jake Borrow').id,
        content: 'You can find all the updated data on my website. Please click here.',
        date: new Date('2020-04-18'),
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Indoor coding').id,
        authorId: authors.find(x => x.displayName == 'Bob').id,
        content: 'I completely disagree',
        date: new Date('2020-04-19'),
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Keep calm and code').id,
        authorId: authors.find(x => x.displayName == 'Pixel').id,
        content: 'Good point!',
        date: new Date('2020-03-31'),
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Keep calm and code').id,
        authorId: authors.find(x => x.displayName == 'Pac Man').id,
        content: 'Yes but...I don\'t think it could work in ALL the situations!',
        date: new Date('2020-02-05'),
        createdAt,
        updatedAt
      }      
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('comments', null, {});
  }
};
