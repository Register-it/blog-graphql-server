require('module-alias/register');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('@src/schema');
const resolvers = require('@src/resolvers');
const models = require('@root/db/models');
const DatabaseSource = require('@src/datasources/DatabaseSource');
const DataLoader = require('dataloader');

const db = new DatabaseSource({ models });

const context = () => ({
  tagsLoader: new DataLoader((postIds) => db.findTagsByPostIds(postIds)),
  likesLoader: new DataLoader((postIds) => db.findLikesByPostIds(postIds)),
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources: () => ({
    db,
  }),
  playground: true,
  introspection: true,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`Server started at ${url}`);
});
