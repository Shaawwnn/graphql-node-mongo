import { AuthUserContext, IUser } from '@models';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from 'schema/UserSchema';

dotenv.config(); // Load env variables

interface LoginUserInput {
  email: string;
  password: string;
}

export const login = async (_: unknown, args: LoginUserInput, context: AuthUserContext): Promise<IUser> => {
  const { res } = context;
  const { email, password } = args;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  try {
    const hasMatched = await user.comparePassword(password);
    if (!hasMatched) {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    console.error('Error validating password:', error);
    throw error;
  }

  const { JWT_SECRET } = process.env;
  //
  if (!JWT_SECRET) throw new Error('JWT_SECRET is undefined');

  const userToken = jwt.sign({ uid: user._id, email: user.email, role: user.role }, JWT_SECRET);

  res.cookie('userToken', userToken, {
    httpOnly: true,
    maxAge: 3600000,
    secure: process.env.NODE_ENV === 'production' // Set to true in production
  }); //1hr

  return user as IUser;
};
