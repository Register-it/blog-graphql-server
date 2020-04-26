'use strict';

const createdAt = new Date(), 
      updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const authors = await queryInterface.sequelize.query(
      'select * from authors', { type: Sequelize.QueryTypes.SELECT }
    );
    
    await queryInterface.bulkInsert('posts', [
      {
        authorId: authors.find(x => x.displayName === 'Pixel').id,
        date: new Date('2020-01-01'),
        readingTime: 1,
        title: 'A happy new year of code!',
        subtitle: 'Most interesting coding languages of 2020',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt lectus in libero ullamcorper consequat. Nulla dignissim lorem sit amet tempor tincidunt. Suspendisse vitae enim euismod, fringilla lectus id, rutrum lacus. Proin dictum eu metus ut blandit. Aenean et dui quam. Fusce id justo facilisis, tristique leo a, dictum est. Vestibulum et augue eu odio auctor semper non at lectus. Aenean vehicula sapien nunc, eget egestas arcu tincidunt sed. In dapibus facilisis libero ut lacinia. Morbi non blandit arcu, sed vehicula ex. In euismod, nisl ut molestie dictum, diam nulla vulputate justo, rhoncus placerat eros tortor sed turpis. Proin ullamcorper quam a purus auctor faucibus.',
        createdAt,
        updatedAt
      },
      {
        authorId: authors.find(x => x.displayName === 'Pixel').id,
        date: new Date('2020-01-17'),
        readingTime: 120,
        title: 'And sweet to me is sinking in this sea',
        subtitle: 'An interesting retrospective on Italian poetry',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt lectus in libero ullamcorper consequat. Nulla dignissim lorem sit amet tempor tincidunt. Suspendisse vitae enim euismod, fringilla lectus id, rutrum lacus. Proin dictum eu metus ut blandit. Aenean et dui quam. Fusce id justo facilisis, tristique leo a, dictum est. Vestibulum et augue eu odio auctor semper non at lectus. Aenean vehicula sapien nunc, eget egestas arcu tincidunt sed. In dapibus facilisis libero ut lacinia. Morbi non blandit arcu, sed vehicula ex. In euismod, nisl ut molestie dictum, diam nulla vulputate justo, rhoncus placerat eros tortor sed turpis. Proin ullamcorper quam a purus auctor faucibus.',
        createdAt,
        updatedAt
      },
      {
        authorId: authors.find(x => x.displayName === 'Spyna').id,
        date: new Date('2020-01-30'),
        readingTime: 180,
        title: 'Hook!',
        subtitle: 'No, nothing to do with Peter Pan',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt lectus in libero ullamcorper consequat. Nulla dignissim lorem sit amet tempor tincidunt. Suspendisse vitae enim euismod, fringilla lectus id, rutrum lacus. Proin dictum eu metus ut blandit. Aenean et dui quam. Fusce id justo facilisis, tristique leo a, dictum est. Vestibulum et augue eu odio auctor semper non at lectus. Aenean vehicula sapien nunc, eget egestas arcu tincidunt sed. In dapibus facilisis libero ut lacinia. Morbi non blandit arcu, sed vehicula ex. In euismod, nisl ut molestie dictum, diam nulla vulputate justo, rhoncus placerat eros tortor sed turpis. Proin ullamcorper quam a purus auctor faucibus.',
        createdAt,
        updatedAt
      },
      {
        authorId: authors.find(x => x.displayName === 'Spyna').id,
        date: new Date('2020-02-19'),
        readingTime: 15,
        title: 'Let\'s React to GraphQL!',
        subtitle: 'Integrate GraphQL into React.js',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt lectus in libero ullamcorper consequat. Nulla dignissim lorem sit amet tempor tincidunt. Suspendisse vitae enim euismod, fringilla lectus id, rutrum lacus. Proin dictum eu metus ut blandit. Aenean et dui quam. Fusce id justo facilisis, tristique leo a, dictum est. Vestibulum et augue eu odio auctor semper non at lectus. Aenean vehicula sapien nunc, eget egestas arcu tincidunt sed. In dapibus facilisis libero ut lacinia. Morbi non blandit arcu, sed vehicula ex. In euismod, nisl ut molestie dictum, diam nulla vulputate justo, rhoncus placerat eros tortor sed turpis. Proin ullamcorper quam a purus auctor faucibus.',
        createdAt,
        updatedAt
      },
      {
        authorId: authors.find(x => x.displayName === 'Pixel').id,
        date: new Date('2020-03-01'),
        readingTime: 30,
        title: 'I, Robot',
        subtitle: 'How to make machines do the job for you',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt lectus in libero ullamcorper consequat. Nulla dignissim lorem sit amet tempor tincidunt. Suspendisse vitae enim euismod, fringilla lectus id, rutrum lacus. Proin dictum eu metus ut blandit. Aenean et dui quam. Fusce id justo facilisis, tristique leo a, dictum est. Vestibulum et augue eu odio auctor semper non at lectus. Aenean vehicula sapien nunc, eget egestas arcu tincidunt sed. In dapibus facilisis libero ut lacinia. Morbi non blandit arcu, sed vehicula ex. In euismod, nisl ut molestie dictum, diam nulla vulputate justo, rhoncus placerat eros tortor sed turpis. Proin ullamcorper quam a purus auctor faucibus.',
        createdAt,
        updatedAt
      },
      {
        authorId: authors.find(x => x.displayName === 'Spyna').id,
        date: new Date('2020-03-25'),
        readingTime: 80,
        title: 'Keep calm and code',
        subtitle: 'Working together to the same codebase',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt lectus in libero ullamcorper consequat. Nulla dignissim lorem sit amet tempor tincidunt. Suspendisse vitae enim euismod, fringilla lectus id, rutrum lacus. Proin dictum eu metus ut blandit. Aenean et dui quam. Fusce id justo facilisis, tristique leo a, dictum est. Vestibulum et augue eu odio auctor semper non at lectus. Aenean vehicula sapien nunc, eget egestas arcu tincidunt sed. In dapibus facilisis libero ut lacinia. Morbi non blandit arcu, sed vehicula ex. In euismod, nisl ut molestie dictum, diam nulla vulputate justo, rhoncus placerat eros tortor sed turpis. Proin ullamcorper quam a purus auctor faucibus.',
        createdAt,
        updatedAt
      },
      {
        authorId: authors.find(x => x.displayName === 'Pixel').id,
        date: new Date('2020-03-27'),
        readingTime: 5,
        title: 'Climb on Apollo\'s chariot',
        subtitle: 'Boot a GraphQL Server with Apollo in 5 minutes',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt lectus in libero ullamcorper consequat. Nulla dignissim lorem sit amet tempor tincidunt. Suspendisse vitae enim euismod, fringilla lectus id, rutrum lacus. Proin dictum eu metus ut blandit. Aenean et dui quam. Fusce id justo facilisis, tristique leo a, dictum est. Vestibulum et augue eu odio auctor semper non at lectus. Aenean vehicula sapien nunc, eget egestas arcu tincidunt sed. In dapibus facilisis libero ut lacinia. Morbi non blandit arcu, sed vehicula ex. In euismod, nisl ut molestie dictum, diam nulla vulputate justo, rhoncus placerat eros tortor sed turpis. Proin ullamcorper quam a purus auctor faucibus.',
        createdAt,
        updatedAt
      },
      {
        authorId: authors.find(x => x.displayName === 'Pixel').id,
        date: new Date('2020-04-15'),
        readingTime: 20,
        title: 'Indoor coding',
        subtitle: 'Surviving the lockdown with just a laptop and a coffee',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt lectus in libero ullamcorper consequat. Nulla dignissim lorem sit amet tempor tincidunt. Suspendisse vitae enim euismod, fringilla lectus id, rutrum lacus. Proin dictum eu metus ut blandit. Aenean et dui quam. Fusce id justo facilisis, tristique leo a, dictum est. Vestibulum et augue eu odio auctor semper non at lectus. Aenean vehicula sapien nunc, eget egestas arcu tincidunt sed. In dapibus facilisis libero ut lacinia. Morbi non blandit arcu, sed vehicula ex. In euismod, nisl ut molestie dictum, diam nulla vulputate justo, rhoncus placerat eros tortor sed turpis. Proin ullamcorper quam a purus auctor faucibus.',
        createdAt,
        updatedAt
      },
      {
        authorId: authors.find(x => x.displayName === 'Spyna').id,
        date: new Date('2020-04-24'),
        readingTime: 5,
        title: 'BBQ Secrets',
        subtitle: 'How to have the perfect barbecue experience',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt lectus in libero ullamcorper consequat. Nulla dignissim lorem sit amet tempor tincidunt. Suspendisse vitae enim euismod, fringilla lectus id, rutrum lacus. Proin dictum eu metus ut blandit. Aenean et dui quam. Fusce id justo facilisis, tristique leo a, dictum est. Vestibulum et augue eu odio auctor semper non at lectus. Aenean vehicula sapien nunc, eget egestas arcu tincidunt sed. In dapibus facilisis libero ut lacinia. Morbi non blandit arcu, sed vehicula ex. In euismod, nisl ut molestie dictum, diam nulla vulputate justo, rhoncus placerat eros tortor sed turpis. Proin ullamcorper quam a purus auctor faucibus.',
        createdAt,
        updatedAt
      }
    ]); 

    const tags = await queryInterface.sequelize.query(
      'select * from tags', { type: Sequelize.QueryTypes.SELECT }
    );

    const posts = await queryInterface.sequelize.query(
      'select * from posts', { type: Sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert('reactions', [
      {
        postId: posts.find(x => x.title === 'A happy new year of code!').id,
        likes: 221,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'And sweet to me is sinking in this sea').id,
        likes: 8,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Hook!').id,
        likes: 1001,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Let\'s React to GraphQL!').id,
        likes: 699,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'I, Robot').id,
        likes: 155,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Keep calm and code').id,
        likes: 50,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Climb on Apollo\'s chariot').id,
        likes: 1313,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Indoor coding').id,
        likes: 98,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'BBQ Secrets').id,
        likes: 823,
        createdAt,
        updatedAt
      }
    ]);

    return queryInterface.bulkInsert('postTags', [
      {
        postId: posts.find(x => x.title === 'A happy new year of code!').id,
        tagId: tags.find(x => x.name === 'coding').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'A happy new year of code!').id,
        tagId: tags.find(x => x.name === 'programming languages').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'And sweet to me is sinking in this sea').id,
        tagId: tags.find(x => x.name === 'poetry').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'And sweet to me is sinking in this sea').id,
        tagId: tags.find(x => x.name === 'Italy').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Hook!').id,
        tagId: tags.find(x => x.name === 'react').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Let\'s React to GraphQL!').id,
        tagId: tags.find(x => x.name === 'graphql').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Let\'s React to GraphQL!').id,
        tagId: tags.find(x => x.name === 'react').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Let\'s React to GraphQL!').id,
        tagId: tags.find(x => x.name === 'client').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Let\'s React to GraphQL!').id,
        tagId: tags.find(x => x.name === 'Apollo').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'I, Robot').id,
        tagId: tags.find(x => x.name === 'testing').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Keep calm and code').id,
        tagId: tags.find(x => x.name === 'coding').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Climb on Apollo\'s chariot').id,
        tagId: tags.find(x => x.name === 'graphql').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Climb on Apollo\'s chariot').id,
        tagId: tags.find(x => x.name === 'Apollo').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Climb on Apollo\'s chariot').id,
        tagId: tags.find(x => x.name === 'server').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Climb on Apollo\'s chariot').id,
        tagId: tags.find(x => x.name === 'nodejs').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Indoor coding').id,
        tagId: tags.find(x => x.name === 'coding').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'Indoor coding').id,
        tagId: tags.find(x => x.name === 'covid-19').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'BBQ Secrets').id,
        tagId: tags.find(x => x.name === 'bbq').id,
        createdAt,
        updatedAt
      },
      {
        postId: posts.find(x => x.title === 'BBQ Secrets').id,
        tagId: tags.find(x => x.name === 'cooking').id,
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
