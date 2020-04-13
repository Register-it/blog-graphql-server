module.exports = {
    Query: {
        getPosts: async (_parent, _args, { dataSources }) => dataSources.db.findAllPosts(),
        getPost: async (_parent, args, { dataSources }) => dataSources.db.findById(args.id)
    },
    Post: {
        tags: () => [],
        likes: () => 0
    }
};