module.exports = {
  Mutation: {
    addLike: (_parent, { postId }, { dataSources }) => dataSources.db.addLike(postId),
  },
  Post: {
    likes: (parent, _args, { likesLoader }) => likesLoader.load(parent.id),
  },
};
