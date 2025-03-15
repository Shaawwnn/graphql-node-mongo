import gql from 'graphql-tag';
import { bookingTypeDefs } from './booking.typeDefs';
import { reviewTypeDefs } from './review.typeDefs';
import { serviceTypeDefs } from './service.typeDefs';
import { userTypeDefs } from './user.typeDefs';

// Define root Query and Mutation to avoid empty merge issues
const rootTypeDefs = gql`
  type Query
  type Mutation
`;

export const typeDefs = [rootTypeDefs, userTypeDefs, serviceTypeDefs, bookingTypeDefs, reviewTypeDefs];
