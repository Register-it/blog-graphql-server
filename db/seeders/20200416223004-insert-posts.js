'use strict';

const createdAt = new Date(), 
      updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const authors = await queryInterface.sequelize.query(
      `select * from authors`, { type: Sequelize.QueryTypes.SELECT }
    );
    
    await queryInterface.bulkInsert('posts', [
      {
        authorId: authors.find(x => x.displayName == 'spyna').id,
        date: new Date(),
        readingTime: 15,
        title: 'Let\'s React to GraphQL!',
        subtitle: 'Integrate GraphQL into React.js',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt lectus in libero ullamcorper consequat. Nulla dignissim lorem sit amet tempor tincidunt. Suspendisse vitae enim euismod, fringilla lectus id, rutrum lacus. Proin dictum eu metus ut blandit. Aenean et dui quam. Fusce id justo facilisis, tristique leo a, dictum est. Vestibulum et augue eu odio auctor semper non at lectus. Aenean vehicula sapien nunc, eget egestas arcu tincidunt sed. In dapibus facilisis libero ut lacinia. Morbi non blandit arcu, sed vehicula ex. In euismod, nisl ut molestie dictum, diam nulla vulputate justo, rhoncus placerat eros tortor sed turpis. Proin ullamcorper quam a purus auctor faucibus.',
        createdAt,
        updatedAt
      },
      {
        authorId: authors.find(x => x.displayName == 'spyna').id,
        date: new Date(),
        readingTime: 5,
        title: 'BBQ Secrets',
        subtitle: 'How to have the perfect barbecue experience',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt lectus in libero ullamcorper consequat. Nulla dignissim lorem sit amet tempor tincidunt. Suspendisse vitae enim euismod, fringilla lectus id, rutrum lacus. Proin dictum eu metus ut blandit. Aenean et dui quam. Fusce id justo facilisis, tristique leo a, dictum est. Vestibulum et augue eu odio auctor semper non at lectus. Aenean vehicula sapien nunc, eget egestas arcu tincidunt sed. In dapibus facilisis libero ut lacinia. Morbi non blandit arcu, sed vehicula ex. In euismod, nisl ut molestie dictum, diam nulla vulputate justo, rhoncus placerat eros tortor sed turpis. Proin ullamcorper quam a purus auctor faucibus.',
        createdAt,
        updatedAt
      },
      {
        authorId: authors.find(x => x.displayName == 'pixel').id,
        date: new Date(),
        readingTime: 5,
        title: 'Climb on Apollo\'s chariot',
        subtitle: 'Boot a GraphQL Server with Apollo in 5 minutes',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt lectus in libero ullamcorper consequat. Nulla dignissim lorem sit amet tempor tincidunt. Suspendisse vitae enim euismod, fringilla lectus id, rutrum lacus. Proin dictum eu metus ut blandit. Aenean et dui quam. Fusce id justo facilisis, tristique leo a, dictum est. Vestibulum et augue eu odio auctor semper non at lectus. Aenean vehicula sapien nunc, eget egestas arcu tincidunt sed. In dapibus facilisis libero ut lacinia. Morbi non blandit arcu, sed vehicula ex. In euismod, nisl ut molestie dictum, diam nulla vulputate justo, rhoncus placerat eros tortor sed turpis. Proin ullamcorper quam a purus auctor faucibus.',
        createdAt,
        updatedAt
      },
      {
        authorId: authors.find(x => x.displayName == 'pixel').id,
        date: new Date(),
        readingTime: 120,
        title: 'And sweet to me is sinking in this sea',
        subtitle: 'An interesting retrospective on Italian poetry',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt lectus in libero ullamcorper consequat. Nulla dignissim lorem sit amet tempor tincidunt. Suspendisse vitae enim euismod, fringilla lectus id, rutrum lacus. Proin dictum eu metus ut blandit. Aenean et dui quam. Fusce id justo facilisis, tristique leo a, dictum est. Vestibulum et augue eu odio auctor semper non at lectus. Aenean vehicula sapien nunc, eget egestas arcu tincidunt sed. In dapibus facilisis libero ut lacinia. Morbi non blandit arcu, sed vehicula ex. In euismod, nisl ut molestie dictum, diam nulla vulputate justo, rhoncus placerat eros tortor sed turpis. Proin ullamcorper quam a purus auctor faucibus.',
        createdAt,
        updatedAt
      }
    ]); 

    const tags = await queryInterface.sequelize.query(
      `select * from tags`, { type: Sequelize.QueryTypes.SELECT }
    );

    const posts = await queryInterface.sequelize.query(
      `select * from posts`, { type: Sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert('reactions', [
      {
        postId: posts[0].id,
        likes: 823,
        createdAt,
        updatedAt
      },
      {
        postId: posts[1].id,
        likes: 78,
        createdAt,
        updatedAt
      },
      {
        postId: posts[2].id,
        likes: 1313,
        createdAt,
        updatedAt
      },
      {
        postId: posts[3].id,
        likes: 8,
        createdAt,
        updatedAt
      }
    ]);

    return queryInterface.bulkInsert('postTags', [
      {
        postId: posts[0].id,
        tagId: tags.find(x => x.name == 'graphql').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts[0].id,
        tagId: tags.find(x => x.name == 'react').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts[0].id,
        tagId: tags.find(x => x.name == 'Apollo').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts[0].id,
        tagId: tags.find(x => x.name == 'client').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts[1].id,
        tagId: tags.find(x => x.name == 'bbq').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts[1].id,
        tagId: tags.find(x => x.name == 'cooking').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts[2].id,
        tagId: tags.find(x => x.name == 'graphql').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts[2].id,
        tagId: tags.find(x => x.name == 'Apollo').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts[2].id,
        tagId: tags.find(x => x.name == 'server').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts[2].id,
        tagId: tags.find(x => x.name == 'nodejs').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts[3].id,
        tagId: tags.find(x => x.name == 'poetry').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts[3].id,
        tagId: tags.find(x => x.name == 'Italy').id,
        createdAt,
        updatedAt
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('postTags', null, {}).then(() => {
      return queryInterface.bulkDelete('posts', null, {});
    });
  }
};
