import { IUser, UserRole } from '@models';
import { User } from 'schema/UserSchema';

interface ICreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: UserRole;
  contactNumber: string;
}

export const createUser = async (_: unknown, args: { userInput: ICreateUserInput }): Promise<IUser | undefined> => {
  try {
    const { userInput } = args;
    const newUser = new User(userInput);
    const user = await newUser.save();
    console.log(user);
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
