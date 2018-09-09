// 1. Require 'apollo server'
//
const { ApolloServer } = require('apollo-server');

const typeDefs = `
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
  }
  
  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }
  
  type Mutation {
    postPhoto(name: String! description: String): Photo!
  }
`;

var _id = 0;
var photos = [];

const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos
  },
  Mutation: {
    postPhoto(parent, args) {
      var newPhoto = {
        id: _id++,
        ...args
      };
      photos.push(newPhoto);

      return newPhoto;
    }
  },
  Photo: {
    url: parent => `http://yoursite.com/img/${parent.id}.jpg`
  }
};

// 2. Create an instance of the server.
// 3. Send it an object with the typeDefs (the schema) and resolvers

const server = new ApolloServer({
  typeDefs,
  resolvers
});

// 4. Call listen ni the server to launch the web server
server
  .listen()
  .then(({url}) => console.log(`GraphQL Service running on $(url)`));
