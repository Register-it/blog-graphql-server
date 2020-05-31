const { withFilter } = require('apollo-server');

const LIKE_ADDED = 'LIKE_ADDED';

module.exports = {
  Mutation: {
    addLike: async (_parent, { postId }, { dataSources, pubsub }) => {
      const likes = await dataSources.db.addLike(postId);
      pubsub.publish(LIKE_ADDED, { likeAdded: likes, postId });
      return likes;
    },
  },
  Post: {
    likes: (parent, _args, { likesLoader }) => likesLoader.load(parent.id),
  },
  Subscription: {
    likeAdded: {
      subscribe: withFilter(
        (_parent, _args, { pubsub }) => pubsub.asyncIterator(LIKE_ADDED),
        (payload, variables) => payload.postId === variables.postId,
      ),
    },
  },
};
