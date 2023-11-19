import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { AuthUseCases } from 'src/app/use-cases/auth/auth.use-case';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthUseCases) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authorization: string[] = req.headers['authorization'].split(' ');
    const api_key = req.headers['x-api-key']?.toString();

    if (!authorization || authorization.length !== 2 || !api_key) {
      throw new UnauthorizedException('Not authorized.');
    }

    const username = authorization[0];
    const password = authorization[1];
    const isValid = await this.authService.validateUser(
      username,
      password,
      api_key,
    );

    if (!isValid) {
      throw new UnauthorizedException('Not authorized.');
    }

    next();
  }
}
