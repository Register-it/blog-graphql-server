const getIncludedObjects = require('../util/getIncludedObjects');

module.exports = {
    Query: {
        posts: (_parent, _args, { dataSources }, info) => dataSources.db.findAllPosts(getIncludedObjects(info)),
        post: (_parent, args, { dataSources }, info) => dataSources.db.findById(args.id, getIncludedObjects(info))
    },
    Post: {
        tags: (parent, _args, { tagsLoader }) => tagsLoader.load(parent.id),
        likes: (parent, _args, { likesLoader }) => likesLoader.load(parent.id)
    }
};