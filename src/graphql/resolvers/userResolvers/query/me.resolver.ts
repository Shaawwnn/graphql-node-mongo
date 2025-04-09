import { AuthUserContext } from '@models';
import { User } from 'schema/UserSchema';

export const me = async (_: unknown, __: null, { authUser }: AuthUserContext) => {
  console.log('called');
  if (!authUser) throw new Error('⚠ Unauthorized User');
  return await User.findById(authUser.uid);
};
