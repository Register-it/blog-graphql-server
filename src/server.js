const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const models = require('../db/models');
const DatabaseSource = require('./datasources/DatabaseSource');

const dataSources = () => ({
    db: new DatabaseSource({ models })
  });

const server = new ApolloServer({
    typeDefs, 
    resolvers, 
    dataSources,
    playground: true,
    introspection: true
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`Server started at ${url}`)
});