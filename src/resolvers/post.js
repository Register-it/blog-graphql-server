const getIncludedObjects = require('../util/getIncludedObjects');

module.exports = {
    Query: {
        posts: async (_parent, _args, { dataSources }, info) => dataSources.db.findAllPosts(getIncludedObjects(info)),
        post: async (_parent, args, { dataSources }, info) => dataSources.db.findById(args.id, getIncludedObjects(info))
    },
    Post: {
        tags: () => [],
        likes: () => 0
    }
};