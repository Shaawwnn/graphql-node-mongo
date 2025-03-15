import gql from 'graphql-tag';

export const bookingTypeDefs = gql`
  enum BookingStatus {
    PENDING
    CONFIRMED
    IN_PROGRESS
    COMPLETED
    CANCELED
    REJECTED
  }

  type Booking {
    id: ID!
    patronId: ID!
    serviceId: ID!
    agentId: ID!
    status: String!
    date: String!
    createdAt: String!
  }

  input BookingInput {
    serviceId: ID!
    date: String!
  }

  extend type Query {
    getBookingsByUser: [Booking]
  }

  extend type Mutation {
    requestBooking(bookingInput: BookingInput!): Booking!
    updateBookingStatus(id: ID!, status: BookingStatus!): Booking!
  }
`;
