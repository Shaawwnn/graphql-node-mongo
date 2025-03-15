import { bookingResolvers } from './bookingResolvers';
import { reviewResolvers } from './reviewResolvers';
import { serviceResolvers } from './serviceResolvers';
import { userResolvers } from './userResolvers';

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...serviceResolvers.Query,
    ...bookingResolvers.Query,
    ...reviewResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...serviceResolvers.Mutation,
    ...bookingResolvers.Mutation,
    ...reviewResolvers.Mutation
  }
};
