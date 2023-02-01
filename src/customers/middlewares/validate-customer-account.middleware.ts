import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateCustomerAccountMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { apikay } = req.headers;

    if (!apikay)
      throw new HttpException('account not valid', HttpStatus.FORBIDDEN);

    // if (!authorization) {
    //   res.status(403).json({ msg: 'account not valid' });
    // }
    next();
  }
}
