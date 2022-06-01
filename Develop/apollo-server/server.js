const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql;

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.


const books = {
  authors: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  // saved book id from GoogleBooks
  bookId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
};

const Query ={
  books:[Book]
}


const resolvers = {
  Query:{
    books: ()=> books,
  }
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
