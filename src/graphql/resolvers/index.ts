import { createUser } from './mutation/createUser';
import { getUser } from './query/getUser';

export const resolvers = {
  Query: {
    getUser
  },
  Mutation: {
    createUser
  }
};
