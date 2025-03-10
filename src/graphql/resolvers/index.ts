import { createUser } from './mutation/createUser.resolver';
import { getUser } from './query/getUser.resolver';
import { login } from './query/login.resolver';

export const resolvers = {
  Query: {
    getUser,
    login
  },
  Mutation: {
    createUser
  }
};
