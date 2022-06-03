const {gql} = require('apollo-server-express')

const typeDefs = gql`
                  type Query {
                    me: User
                  }
                  input SaveBookInput {
                    description: String
                    title: String
                    bookId,: String!
                    image: String
                    link: String
                    authors: [String]
                  }
                  type Mutation {
                    login(email: String, password: String): Auth
                    addUser(username: String!, email: String!, password: String!): Auth
                    saveBook(book: [SaveBookInput]): User
                    removeBook(bookId: String): User
                  }

                  type User {
                      _id: String
                      username: String
                      email: String
                      bookCount: String
                      savedBooks: [Book]
                  }

                  type Book {
                      bookId: String
                      authors: [String]
                      description: String
                      title: String
                      image: String
                      link: String
                  }

                  type Auth {
                      token: String
                      user: User
                  }
        `;

module.exports = typeDefs;