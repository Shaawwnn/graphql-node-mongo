import { createUser } from './mutation/createUser.resolver';
import { getUser } from './query/getUser.resolver';

export const resolvers = {
  Query: {
    getUser
  },
  Mutation: {
    createUser
  }
};
