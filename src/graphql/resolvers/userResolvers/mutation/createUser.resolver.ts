import { AuthUserContext, IUser, UserRole } from '@models';
import jwt from 'jsonwebtoken';
import { User } from 'schema/UserSchema';

interface ICreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: UserRole;
  contactNumber: string;
}

export const createUser = async (
  _: unknown,
  args: { userInput: ICreateUserInput },
  context: AuthUserContext
): Promise<IUser | undefined> => {
  const { res } = context;

  try {
    const { userInput } = args;
    const newUser = new User(userInput);
    const user = await newUser.save();

    if (!user._id) {
      throw new Error('User document missing _id');
    }
    console.log(`🚀 ${user.firstName} successfully added!\n`);
    const { JWT_SECRET } = process.env;
    //
    if (!JWT_SECRET) throw new Error('JWT_SECRET is undefined');

    const userToken = jwt.sign({ uid: user._id, email: user.email, role: user.role }, JWT_SECRET);

    res.cookie('userToken', userToken, {
      httpOnly: true,
      maxAge: 3600000,
      secure: false
    }); //1hr
    return user;
    //
  } catch (error) {
    console.error('⚠️ Error creating user. \n', error);
    throw new Error(`\nFailed to create new user: \n${error}`);
  }
};
