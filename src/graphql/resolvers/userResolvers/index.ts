import { createUser } from './mutation/createUser.resolver';
import { login } from './mutation/login.resolver';
import { getUser } from './query/getUser.resolver';
import { googleAuth } from './query/googleAuth.resolver';
import { me } from './query/me.resolver';

export const userResolvers = {
  Query: {
    getUser,
    googleAuth,
    me
  },
  Mutation: {
    login,
    createUser
  }
};
