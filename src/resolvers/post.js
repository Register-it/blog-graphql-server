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

    post: (_parent, args, { dataSources }, info) => dataSources.db.findPostById(args.id, getIncludedObjects(info)),

    comments: (_parent, { postId, first = 5, after }, { dataSources }) => paginateByDateAndId({
      dataSource: dataSources.db,
      method: 'findCommentsByPostId',
      args: [postId],
      first,
      after,
    }),
  },
  Mutation: {
    addLike: (_parent, { postId }, { dataSources }) => dataSources.db.addLike(postId),
    addComment: (_parent, { postId, comment }, { dataSources }) => dataSources.db.addComment(postId, comment),
  },
  Post: {
    date: ({ date }) => date.toISOString(),

    comments: (parent, { first = 5, after }, { dataSources }) => paginateByDateAndId({
      dataSource: dataSources.db,
      method: 'findCommentsByPostId',
      args: [parent.id],
      first,
      after,
    }),

    tags: (parent, _args, { tagsLoader }) => tagsLoader.load(parent.id),
    likes: (parent, _args, { likesLoader }) => likesLoader.load(parent.id),
  },
  Comment: {
    date: ({ date }) => date.toISOString(),
  },
};
