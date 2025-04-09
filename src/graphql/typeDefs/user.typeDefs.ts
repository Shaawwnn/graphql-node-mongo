import gql from 'graphql-tag';

export const userTypeDefs = gql`
  enum UserRole {
    PATRON
    ADMIN
    AGENT
  }
  scalar Date

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    pronouns: String
    contactNumber: String
    password: String
    role: UserRole!
    imageUrl: String
    bio: String
    rating: Float
    createdAt: Date
    updatedAt: Date
    title: String
  }

  # create enums
  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    contactNumber: String
    role: UserRole
  }

  type Me {
    _id: ID!
    email: String!
    lastName: String!
    firstName: String!
    role: String!
    imageUrl: String
  }

  type Query {
    getUser(id: ID!): User!
    getAllUsers: [User]
    googleAuth(idToken: String): User!
    me: Me!
  }

  type Mutation {
    login(email: String!, password: String!): User!
    createUser(userInput: CreateUserInput!): User!
  }
`;
