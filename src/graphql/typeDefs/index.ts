import gql from 'graphql-tag';
import { userTypeDefs } from './user.typeDefs';

// Define root Query and Mutation to avoid empty merge issues
const rootTypeDefs = gql`
  type Query
  type Mutation
`;

export const typeDefs = [rootTypeDefs, userTypeDefs];
