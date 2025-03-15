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
    pronouns: String
    password: String
    role: UserRole!
    imageUrl: String
    bio: String
    title: String
    contactNumber: String
    description: String
  }

  type Query {
    getUser(id: ID!): User!
    getAllUsers: [User]
    login(email: String!, password: String!): User!
    googleAuth(idToken: String): User!
  }

  type Mutation {
    createUser(userInput: CreateUserInput!): User!
  }
`;
