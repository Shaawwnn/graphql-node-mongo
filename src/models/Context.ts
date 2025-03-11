import { BaseContext } from '@apollo/server';
import { Request, Response } from 'express';

export interface IContext extends BaseContext {
  req: Request;
  res: Response;
}
