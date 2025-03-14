import { bookingResolvers } from './bookingResolvers';
import { serviceResolvers } from './serviceResolvers';
import { userResolvers } from './userResolvers';

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...serviceResolvers.Query,
    ...bookingResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...serviceResolvers.Mutation,
    ...bookingResolvers.Mutation
  }
};
