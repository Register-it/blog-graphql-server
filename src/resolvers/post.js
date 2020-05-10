const getIncludedObjects = require('../utils/getIncludedObjects');
const { paginateByDateAndId } = require('../utils/pagination');

module.exports = {
  Query: {
    posts: (_parent, { first = 5, after }, { dataSources }, info) => paginateByDateAndId({
      dataSource: dataSources.db,
      method: 'findAllPosts',
      args: [getIncludedObjects(info)],
      first,
      after,
    }),

    post: (_parent, { id }, { dataSources }, info) => dataSources.db.findPostById(id, getIncludedObjects(info)),
  },
  Post: {
    date: ({ date }) => date.toISOString(),
  },
};
