import { Injectable } from '@nestjs/common';
import { ICacheServices } from 'src/app/core/abstracts/cache-services.abstract';
import { ConfigService } from 'src/configuration';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ReqRateLimiterUseCases {
  constructor(
    private readonly cacheServices: ICacheServices,
    private readonly configService: ConfigService,
  ) {}

  async checkReqRateLimit(
    token: string,
    reqLimit: number,
    totalCacheExpireMS: number,
    reqWeight: number = 1,
  ) {
    const ttl = totalCacheExpireMS;

    const requestKeys =
      await this.cacheServices.cacheStorage.getAllKeysByPattern(
        `req-rate-limit:${token}:*`,
      );
    //If There is no any KEY with Token
    if (requestKeys.length === 0) {
      await this.cacheServices.cacheStorage.cacheItem(
        `req-rate-limit:${token}:${uuid()}`,
        reqWeight,
        ttl,
      );
      const isLimitOver = false;
      const remainingTimeForNextRequest_ms = 0;
      return { token, reqWeight, isLimitOver, remainingTimeForNextRequest_ms };
    }

    //If any KEY exists
    const requestWeights =
      await this.cacheServices.cacheStorage.getAllValuesWithMulKeys(
        requestKeys,
      );

    const requestTTLs = await Promise.all(
      requestKeys.map((k) => this.cacheServices.cacheStorage.getTTLByKey(k)),
    );

    //Find total used request Limit by User TokenOrIPAddress
    const currentTotalReqWeight = requestWeights.reduce(
      (acc, val) => (acc + val) as number,
      0,
    );

    const isLimitOver = currentTotalReqWeight >= reqLimit;
    const remainingTimeForNextRequest_ms = isLimitOver
      ? Math.min(...requestTTLs)
      : 0;

    if (!isLimitOver) {
      await this.cacheServices.cacheStorage.cacheItem(
        `req-rate-limit:${token}:${uuid()}`,
        reqWeight,
        ttl,
      );
    }
    return {
      token,
      currentTotalReqWeight,
      isLimitOver,
      remainingTimeForNextRequest_ms,
    };
  }
}
