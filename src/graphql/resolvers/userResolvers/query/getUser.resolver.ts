import { User } from 'schema/UserSchema';

export const getUser = async (_: unknown, args: { id: string }) => {
  const { id } = args;
  return await User.findById(id);
};
