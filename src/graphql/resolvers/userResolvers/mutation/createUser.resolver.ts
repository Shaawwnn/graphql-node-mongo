import { IUser, UserRole } from '@models';
import { User } from 'schema/UserSchema';

interface CreateUserArgs {
  firstName: string;
  lastName: string;
  email: string;
  gender: string | undefined;
  contactNumber: string;
  pronouns: string;
  password: string;
  role?: UserRole;
  image?: string;
  bio?: string;
  description?: string;
  title: string;
}

export const createUser = async (_: unknown, args: { userInput: CreateUserArgs }): Promise<IUser | undefined> => {
  try {
    const { userInput } = args;
    const newUser = new User(userInput);
    const user = await newUser.save();

    if (!user._id) {
      throw new Error('User document missing _id');
    }
    console.log(`🚀 ${user.firstName} successfully added!\n`);

    return user;
    //
  } catch (error) {
    console.error('⚠️ Error creating user. \n', error);
    throw new Error(`\nFailed to create new user: \n${error}`);
  }
};
