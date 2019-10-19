require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');



//var types =  gql`${fs.readFileSync(__dirname.concat('/schema.graphql'), 'utf8')}`;
var types = require('./types');
var mutation = require('./resolvers/mutation');
var query = require('./resolvers/query');
var schedule = require('./resolvers/schedule');

const server = new ApolloServer({
  typeDefs: types,
  resolvers: {
    Mutation:mutation,
    Query:query,
    Schedule:schedule
  },
  formatError: error => {
    console.log(new Date().toUTCString(),error);
    return error;
  },
  formatResponse: response => {
    console.log(new Date().toUTCString());
    console.log(response);
    return response;
  },
});

server.listen(process.env.PORT).then(({ url }) => console.log(`Server ready at ${url}`));