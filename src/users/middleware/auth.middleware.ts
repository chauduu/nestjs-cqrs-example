import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { secret } from 'src/config/auth.config';
import { RoleEnum } from '../models/enums/role.enum';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Invalid or missing Authorization header',
      );
    }

    const token = authHeader.split('Bearer ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    verify(token, secret, (err, decoded) => {
      if (err) {
        throw new UnauthorizedException('Token verification failed');
      }
      const { roles } = decoded as { roles: RoleEnum[] };
      req['user'] = decoded;
      req['roles'] = roles;
      req['userId'] = decoded.data;
      next();
    });
  }
}
