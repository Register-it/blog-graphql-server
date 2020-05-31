const { paginateByDateAndId } = require('@src/utils/pagination');
const { withFilter } = require('apollo-server');

const COMMENT_ADDED = 'COMMENT_ADDED';

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
    addComment: async (_parent, { postId, comment }, { dataSources, pubsub }) => {
      const displayName = comment.authorDisplayName;
      const author = {
        displayName,
        image: `https://robohash.org/${displayName.replace(/\s/, '%20')}`,
      };

      const result = await dataSources.db.addComment(postId, author, comment.content);
      pubsub.publish(COMMENT_ADDED, { commentAdded: result });

      return result;
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
  Subscription: {
    commentAdded: {
      subscribe: withFilter(
        (_parent, _args, { pubsub }) => pubsub.asyncIterator(COMMENT_ADDED),
        (payload, variables) => payload.commentAdded.postId === variables.postId,
      ),
    },
  },
};
