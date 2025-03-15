import { IUser, UserRole } from '@models';
import { User } from 'schema/UserSchema';

interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  pronouns: string;
  password: string;
  role: UserRole;
  image?: string;
  bio?: string;
  description?: string;
  title: string;
  contactNumber: string;
}

export const createUser = async (_: unknown, args: { userInput: CreateUserInput }): Promise<IUser | undefined> => {
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
