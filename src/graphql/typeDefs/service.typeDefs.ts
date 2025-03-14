import gql from 'graphql-tag';

export const serviceTypeDefs = gql`
  type Service {
    id: ID!
    providerId: ID!
    title: String!
    description: String!
    category: String!
    price: Float!
    images: [String]
    location: String!
    ratings: Float
    createdAt: String!
    updatedAt: String!
  }

  input ServiceInput {
    title: String!
    description: String!
    category: String!
    price: Float!
    images: [String]
    location: String!
  }

  extend type Query {
    getAllServices: [Service]
    getServiceById(id: ID!): Service
  }

  extend type Mutation {
    createService(serviceInput: ServiceInput!): Service!
    deleteService(id: ID!): Boolean
  }
`;
