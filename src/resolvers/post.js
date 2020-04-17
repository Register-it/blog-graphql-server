const getIncludedObjects = require('../util/getIncludedObjects');

module.exports = {
    Query: {
        posts: (_parent, _args, { dataSources }, info) => dataSources.db.findAllPosts(getIncludedObjects(info)),
        post: (_parent, args, { dataSources }, info) => dataSources.db.findById(args.id, getIncludedObjects(info))
    },
    Post: {
        tags: (parent, _args, { dataSources }) => dataSources.db.findTagsByPostId(parent.id),
        likes: (parent, _args, { dataSources }) => dataSources.db.findLikesByPostId(parent.id)
    }
};