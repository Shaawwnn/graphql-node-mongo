import { createUser } from './mutation/createUser.resolver';
import { getUser } from './query/getUser.resolver';
import { googleAuth } from './query/googleAuth.resolver';
import { login } from './query/login.resolver';

export const userResolvers = {
  Query: {
    getUser,
    login,
    googleAuth
  },
  Mutation: {
    createUser
  }
};
