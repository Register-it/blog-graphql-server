require('module-alias/register');
const models = require('@root/db/models');
const DatabaseSource = require('@src/datasources/DatabaseSource');
const createServer = require('@src/server');

const server = createServer(new DatabaseSource({ models }));

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`Server started at ${url}`);
});
