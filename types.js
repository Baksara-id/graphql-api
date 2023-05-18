const { ApolloServer, gql } = require('apollo-server');

const types = gql`
  type User {
    id: Int!
    langganan_id: Int
    name: String!
    email: String!
    password: String!

    # sek yo, iki sg bawah2 mari tak edit disek
    avatar: String
    exp: Float
    level: Int
    jumlah_scan: Int
    kadaluwarsa: String
    
    levels: [Level]
  }
  type Level {
    id: Int!
    nama: String!
    users: [User]
  }
  type UserLevel {
    user_id: Int!
    level_id: Int!
  }
  type Query {
    users: [User!]!
    levels: [Level!]!
    user_levels: [UserLevel!]!
  }
  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    updateUser(
      id: Int!
      name: String!
      email: String!
      password: String!
    ): User!
    deleteUser(id: Int!): Boolean!
    createLevel(nama: String!): Level!
    updateLevel(id: Int!, nama: String!): Level!
    deleteLevel(id: Int!): Boolean!
    createUserLevel(user_id: Int!, level_id: Int!): UserLevel!
    deleteUserLevel(user_id: Int!, level_id: Int!): Boolean!
    updateUserLevel(user_id: Int!, level_id: Int!): UserLevel!
  }
`;

module.exports = types;