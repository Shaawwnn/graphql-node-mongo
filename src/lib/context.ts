import { AuthUser, AuthUserContext } from '@models';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Function to extract user from token
export const contextFn = async ({ req, res }: { req: Request; res: Response }): Promise<AuthUserContext> => {
  let authUser = null;

  const token = req.cookies.userToken;
  if (token) {
    try {
      authUser = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;
    } catch (error) {
      console.error('Invalid Token:', error);
      res.status(401).send({ message: 'User is not authenticated.' });
    }
  }

  return { req, res, authUser }; // Attach user to context
};
