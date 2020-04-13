const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./schema');
const { merge } = require('lodash');
const postResolvers = require('./resolvers/post');
const models = require('../db/models');
const DatabaseSource = require('./datasources/DatabaseSource');

const resolvers = {};

const dataSources = () => ({
    db: new DatabaseSource({ models })
  });

const server = new ApolloServer({
    typeDefs, 
    resolvers: merge(postResolvers, resolvers), 
    dataSources,
    playground: true,
    introspection: true
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`Server started at ${url}`)
});