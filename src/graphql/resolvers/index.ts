import { fruitResolvers } from "./resolvers";

// Define root Query and Mutation to avoid empty merge issues
export const resolvers = {
  Query: {
    ...fruitResolvers.Query,
  },
  Mutation: {
    ...fruitResolvers.Mutation,
  },
};
