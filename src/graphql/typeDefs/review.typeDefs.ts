import gql from 'graphql-tag';

export const reviewTypeDefs = gql`
  type Review {
    bookingId: ID!
    patronId: ID!
    agentId: ID!
    rating: Int!
    comment: String
    createdAt: Date
    updatedAt: Date
  }

  input ReviewInput {
    bookingId: ID!
    patronId: ID!
    agentId: ID!
    rating: Int!
    comment: String
  }

  type Query {
    getReview(id: ID!): Review
    getServiceReviews(serviceId: ID!): [Review]
  }

  type Mutation {
    addReview(reviewInput: ReviewInput!): Review!
  }
`;
