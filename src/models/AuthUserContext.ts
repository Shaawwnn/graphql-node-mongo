import { BaseContext } from '@apollo/server';
import { Request, Response } from 'express';
import { AuthUser } from './AuthUser';

export interface AuthUserContext extends BaseContext {
  req: Request;
  res: Response;
  authUser: AuthUser;
}
