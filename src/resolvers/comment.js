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
    addComment: (_parent, { postId, comment }, { dataSources }) => {
      const displayName = comment.authorDisplayName;
      const author = {
        displayName,
        image: `https://robohash.org/${displayName.replace(/\s/, '%20')}`,
      };
      return dataSources.db.addComment(postId, author, comment.content);
    },
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
