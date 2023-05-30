const { ApolloServer, gql } = require('apollo-server');
const types = require('./types');
const resolvers = require('./resolvers');
const context = require('./context');

const server = new ApolloServer({
    typeDefs: types, resolvers, context, playground: true,
    introspection: true
});
// const port = 4000;

// The port to listen on
const PORT = process.env.PORT || 8080;

// Start the server
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
