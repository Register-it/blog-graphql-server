'use strict';

const createdAt = new Date(), 
      updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('authors', [
      {
        image: 'https://robohash.org/example1',
        displayName: 'spyna',
        createdAt,
        updatedAt
      },
      {
        image: 'https://robohash.org/example4',
        displayName: 'pixel13',
        createdAt,
        updatedAt
      },
    ]);
    
    const authors = await queryInterface.sequelize.query(
      `select id from authors;`
    );
    
    return queryInterface.bulkInsert('posts', [
      {
        authorId: authors[0][0].id,
        date: new Date(),
        readingTime: 15,
        title: 'Let\'s React to GraphQL!',
        subtitle: 'Integrate GraphQL into React.js',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt lectus in libero ullamcorper consequat. Nulla dignissim lorem sit amet tempor tincidunt. Suspendisse vitae enim euismod, fringilla lectus id, rutrum lacus. Proin dictum eu metus ut blandit. Aenean et dui quam. Fusce id justo facilisis, tristique leo a, dictum est. Vestibulum et augue eu odio auctor semper non at lectus. Aenean vehicula sapien nunc, eget egestas arcu tincidunt sed. In dapibus facilisis libero ut lacinia. Morbi non blandit arcu, sed vehicula ex. In euismod, nisl ut molestie dictum, diam nulla vulputate justo, rhoncus placerat eros tortor sed turpis. Proin ullamcorper quam a purus auctor faucibus.',
        createdAt,
        updatedAt
      },
      {
        authorId: authors[0][0].id,
        date: new Date(),
        readingTime: 5,
        title: 'BBQ Secrets',
        subtitle: 'How to have the perfect barbecue experience',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt lectus in libero ullamcorper consequat. Nulla dignissim lorem sit amet tempor tincidunt. Suspendisse vitae enim euismod, fringilla lectus id, rutrum lacus. Proin dictum eu metus ut blandit. Aenean et dui quam. Fusce id justo facilisis, tristique leo a, dictum est. Vestibulum et augue eu odio auctor semper non at lectus. Aenean vehicula sapien nunc, eget egestas arcu tincidunt sed. In dapibus facilisis libero ut lacinia. Morbi non blandit arcu, sed vehicula ex. In euismod, nisl ut molestie dictum, diam nulla vulputate justo, rhoncus placerat eros tortor sed turpis. Proin ullamcorper quam a purus auctor faucibus.',
        createdAt,
        updatedAt
      },
      {
        authorId: authors[0][1].id,
        date: new Date(),
        readingTime: 5,
        title: 'Climb on Apollo\'s chariot',
        subtitle: 'Boot a GraphQL Server with Apollo in 5 minutes',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt lectus in libero ullamcorper consequat. Nulla dignissim lorem sit amet tempor tincidunt. Suspendisse vitae enim euismod, fringilla lectus id, rutrum lacus. Proin dictum eu metus ut blandit. Aenean et dui quam. Fusce id justo facilisis, tristique leo a, dictum est. Vestibulum et augue eu odio auctor semper non at lectus. Aenean vehicula sapien nunc, eget egestas arcu tincidunt sed. In dapibus facilisis libero ut lacinia. Morbi non blandit arcu, sed vehicula ex. In euismod, nisl ut molestie dictum, diam nulla vulputate justo, rhoncus placerat eros tortor sed turpis. Proin ullamcorper quam a purus auctor faucibus.',
        createdAt,
        updatedAt
      },
      {
        authorId: authors[0][1].id,
        date: new Date(),
        readingTime: 120,
        title: 'And sweet to me is sinking in this sea',
        subtitle: 'An interesting retrospective on Italian poetry',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt lectus in libero ullamcorper consequat. Nulla dignissim lorem sit amet tempor tincidunt. Suspendisse vitae enim euismod, fringilla lectus id, rutrum lacus. Proin dictum eu metus ut blandit. Aenean et dui quam. Fusce id justo facilisis, tristique leo a, dictum est. Vestibulum et augue eu odio auctor semper non at lectus. Aenean vehicula sapien nunc, eget egestas arcu tincidunt sed. In dapibus facilisis libero ut lacinia. Morbi non blandit arcu, sed vehicula ex. In euismod, nisl ut molestie dictum, diam nulla vulputate justo, rhoncus placerat eros tortor sed turpis. Proin ullamcorper quam a purus auctor faucibus.',
        createdAt,
        updatedAt
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('posts', null, {}).then(() => {
      return queryInterface.bulkDelete('authors', null, {});
    });
  }
};
