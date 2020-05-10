const { paginateByDateAndId } = require('../utils/pagination');

module.exports = {
  Query: {
    comments: (_parent, { postId, first = 5, after }, { dataSources }) => paginateByDateAndId({
      dataSource: dataSources.db,
      method: 'findCommentsByPostId',
      args: [postId],
      first,
      after,
    }),
  },
  Mutation: {
    addComment: (_parent, { postId, comment }, { dataSources }) => dataSources.db.addComment(postId, comment),
  },
  Post: {
    comments: (parent, { first = 5, after }, { dataSources }) => paginateByDateAndId({
      dataSource: dataSources.db,
      method: 'findCommentsByPostId',
      args: [parent.id],
      first,
      after,
    }),
  },
  Comment: {
    date: ({ date }) => date.toISOString(),
  },
};
