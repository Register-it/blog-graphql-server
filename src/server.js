const { ApolloServer, PubSub } = require('apollo-server');
const typeDefs = require('@src/schema');
const resolvers = require('@src/resolvers');
const DataLoader = require('dataloader');

const pubsub = new PubSub();

module.exports = (db) => {
  const context = () => ({
    tagsLoader: new DataLoader((postIds) => db.findTagsByPostIds(postIds)),
    likesLoader: new DataLoader((postIds) => db.findLikesByPostIds(postIds)),
    pubsub,
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
