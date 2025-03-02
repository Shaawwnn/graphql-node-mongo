import { foodResolvers } from "./food.resolvers";

// Define root Query and Mutation to avoid empty merge issues
export const resolvers = {
  Query: {
    ...foodResolvers.Query,
  },
  Mutation: {
    ...foodResolvers.Mutation,
  },
};
