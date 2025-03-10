import { IUser, UserRole } from '@models';
import { User } from 'schema/mongoose/UserSchema';

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
    const userDoc = await newUser.save();

    if (!userDoc._id) {
      throw new Error('User document missing _id');
    }
    console.log(`🚀 ${userDoc.firstName} successfully added!\n`);

    const user: IUser = {
      _id: userDoc._id.toString() || '',
      firstName: userDoc.firstName,
      lastName: userDoc.lastName,
      email: userDoc.email,
      pronouns: userDoc.pronouns,
      password: userDoc.password,
      contactNumber: userDoc.contactNumber,
      role: userDoc.role,
      imageUrl: userDoc.imageUrl,
      bio: userDoc.bio,
      rating: userDoc.rating,
      createdAt: new Date(),
      title: userDoc.title
    };
    return user;
    //
  } catch (error) {
    console.error('⚠️ Error creating user. \n', error);
    throw new Error(`\nFailed to create new user: \n${error}`);
  }
};
