import { IContext, IUser } from '@models';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from 'schema/mongoose/UserSchema';

dotenv.config(); // Load env variables

interface LoginUserInput {
  email: string;
  password: string;
}

export const login = async (_: unknown, args: LoginUserInput, context: IContext): Promise<IUser> => {
  const { res } = context;
  const { email, password } = args;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const hasMatched = await user.comparePassword(password);
  if (!hasMatched) {
    throw new Error('Invalid email or password');
  }

  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) throw new Error('JWT_SECRET is undefined');

  const userToken = jwt.sign({ uid: user._id }, JWT_SECRET);

  res.cookie('userToken', userToken, { httpOnly: true, maxAge: 3600000 }); //1hr
  return user as IUser;
};
