import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { PrivateRoutes } from 'src/app/constants';
import { ReqRateLimiterUseCases } from 'src/app/use-cases/req-rate-limiter/req-rate-limiter.use-case';
import { ConfigService } from 'src/configuration';
import { CustomRateLimitError } from '../exceptions/CustomRateLimitError.exception';

@Injectable()
export class PrivateReqRateLimiterMiddleware implements NestMiddleware {
  constructor(
    private readonly reqRateLimiterService: ReqRateLimiterUseCases,
    private configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const userToken = req.headers['x-api-key']?.toString();
    const totalLimit =
      this.configService.get().rate_limiter.TOKEN_RATE_LIMIT_REQ;
    const totalCacheExpireMS =
      this.configService.get().rate_limiter.TOKEN_RATE_LIMIT_REQ_MS;

    const reqAction = PrivateRoutes[req.url.slice(1)];
    const currentReqweight = reqAction.rateLimit;

    const result = await this.reqRateLimiterService.checkReqRateLimit(
      userToken,
      totalLimit,
      totalCacheExpireMS,
      currentReqweight,
    );

    console.log('New Request Result******'); //TODO Remove
    console.log(result); //TODO Remove

    if (result.isLimitOver)
      throw new CustomRateLimitError(
        totalLimit,
        result.remainingTimeForNextRequest_ms,
      );

    next();
  }
}
