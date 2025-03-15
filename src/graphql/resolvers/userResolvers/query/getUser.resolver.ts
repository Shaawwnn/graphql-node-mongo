import { IUser } from '@models';
import { User } from 'schema/UserSchema';

export const getUser = async (_: unknown, args: { id: string }): Promise<IUser | null> => {
  const { id } = args;
  return await User.findById(id);
};
