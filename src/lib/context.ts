import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface GraphQLContext {
  req: Request;
  res: Response;
  user: { id: string; email: string; role?: string } | null;
}

// Function to extract user from token
export const contextFn = async ({ req, res }: { req: Request; res: Response }): Promise<GraphQLContext> => {
  let user = null;

  const token = req.headers.authorization?.split(' ')[1]; // Expect "Bearer TOKEN"
  if (token) {
    try {
      user = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; email: string; role?: string };
    } catch (error) {
      console.log('Invalid Token:', error);
    }
  }

  return { req, res, user }; // Attach user to context
};
