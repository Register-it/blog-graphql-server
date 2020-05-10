const { ApolloServer } = require('apollo-server');
const typeDefs = require('@src/schema');
const resolvers = require('@src/resolvers');
const DataLoader = require('dataloader');

module.exports = (db) => {
  const context = () => ({
    tagsLoader: new DataLoader((postIds) => db.findTagsByPostIds(postIds)),
    likesLoader: new DataLoader((postIds) => db.findLikesByPostIds(postIds)),
  });

  return new ApolloServer({
    typeDefs,
    resolvers,
    context,
    dataSources: () => ({
      db,
    }),
    playground: true,
    introspection: true,
  });
};
