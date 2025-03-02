import { gql } from "apollo-server-express";
import { foodTypeDefs } from "./food.typeDefs";

// Define root Query and Mutation to avoid empty merge issues
const rootTypeDefs = gql`
  type Query
  type Mutation
`;

export const typeDefs = [rootTypeDefs, foodTypeDefs];
