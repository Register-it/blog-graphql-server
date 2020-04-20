const getIncludedObjects = require('../util/getIncludedObjects');

module.exports = {
    Query: {
        posts: (_parent, _args, { dataSources }, info) => dataSources.db.findAllPosts(getIncludedObjects(info)),
        post: (_parent, args, { dataSources }, info) => dataSources.db.findById(args.id, getIncludedObjects(info))
    
    },
    Mutation: {
        addLike: (_parent, args, { dataSources }) => dataSources.db.addLike(args.postId)
    },
    Post: {
        comments: (parent, _args, { commentsLoader }) => commentsLoader.load(parent.id),
        tags: (parent, _args, { tagsLoader }) => tagsLoader.load(parent.id),
        likes: (parent, _args, { likesLoader }) => likesLoader.load(parent.id)
    }
};