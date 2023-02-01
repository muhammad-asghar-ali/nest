import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateCustomerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization)
      throw new HttpException(
        'No authorization token provide',
        HttpStatus.FORBIDDEN,
      );

    // if (!authorization) {
    //   res.status(403).json({ msg: 'No authorization token provide' });
    // }
    next();
  }
}
