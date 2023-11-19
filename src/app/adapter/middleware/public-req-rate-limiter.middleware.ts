import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ReqRateLimiterUseCases } from 'src/app/use-cases/req-rate-limiter/req-rate-limiter.use-case';
import { ConfigService } from 'src/configuration';
import { PublicRoutes } from 'src/app/constants';
import { CustomRateLimitError } from '../exceptions/CustomRateLimitError.exception';

@Injectable()
export class PublicReqRateLimiterMiddleware implements NestMiddleware {
  constructor(
    private readonly reqRateLimiterService: ReqRateLimiterUseCases,
    private configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    //IP ADDRESS RATE LIMIT
    const userIPAddress =
      (req.headers['x-forwarded-for'] as string) ||
      req.ip ||
      req.socket.remoteAddress;

    const totalLimit = this.configService.get().rate_limiter.IP_RATE_LIMIT_REQ;
    const totalCacheExpireMS =
      this.configService.get().rate_limiter.IP_RATE_LIMIT_REQ_MS;
    const reqAction = PublicRoutes[req.url.slice(1)];
    const currentReqweight = reqAction.request_weight;

    const result = await this.reqRateLimiterService.checkReqRateLimit(
      userIPAddress,
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
