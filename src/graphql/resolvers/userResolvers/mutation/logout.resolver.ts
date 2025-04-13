import { AuthUserContext } from '@models';
import dotenv from 'dotenv';

dotenv.config(); // Load env variables

export const logout = async (_: unknown, __: any, context: AuthUserContext): Promise<Boolean> => {
  const { res } = context;

  res.cookie('userToken', '', {
    httpOnly: true,
    maxAge: 0,
    secure: process.env.NODE_ENV === 'production', // Set to true in production
    sameSite: 'lax'
  }); //1hr

  return true;
};
