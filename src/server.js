const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const models = require('../db/models');
const DatabaseSource = require('./datasources/DatabaseSource');
const DataLoader = require('dataloader');

const db = new DatabaseSource({ models });

 const context = () => ({
    tagsLoader: new DataLoader(postIds => db.findTagsByPostIds(postIds)),
    likesLoader: new DataLoader(postIds => db.findLikesByPostIds(postIds)),
    commentsLoader: new DataLoader(postIds => db.findCommentsByPostIds(postIds))
});

const server = new ApolloServer({
    typeDefs, 
    resolvers, 
    context,
    dataSources: () => ({
        db
    }),
    playground: true,
    introspection: true
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`Server started at ${url}`)
});