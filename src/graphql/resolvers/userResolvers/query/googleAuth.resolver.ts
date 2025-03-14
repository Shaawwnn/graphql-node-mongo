import { IContext, IUser } from '@models';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { User } from 'schema/UserSchema';

dotenv.config();

export const googleAuth = async (_: unknown, args: { idToken: string }, context: IContext): Promise<IUser> => {
  const { res } = context;
  const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID || '';
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) throw new Error('JWT_SECRET is undefined');

  const client = new OAuth2Client(OAUTH_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: args.idToken,
    audience: OAUTH_CLIENT_ID
  });

  const payload = ticket.getPayload();
  if (!payload) throw new Error('Invalid Google credentials');

  const {
    sub: googleId,
    given_name: firstName,
    family_name: lastName,
    email,
    email_verified,
    picture: imageUrl
  } = payload;

  if (!email_verified) throw new Error('Email not verified by Google');

  // Find user or create a new one
  let user = await User.findOne({ email }).exec();
  if (!user) {
    user = new User({ email, googleId, firstName, lastName, imageUrl });
    user = await user.save(); // ✅ Assign the saved user
  }

  const userToken = jwt.sign({ uid: user._id }, JWT_SECRET);

  res.cookie('userToken', userToken, { httpOnly: true, maxAge: 3600000 });

  return user;
};
