import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigService, ConfigurationModule } from 'src/configuration';
import { redisStore } from 'cache-manager-redis-yet';
import { ICacheServices } from 'src/app/core/abstracts/cache-services.abstract';
import { RedisCacheServices } from './redis-cache-services.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigurationModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: 3600000,
        // ttl: configService.get().redis.REDIS_CACHE_EXPIRE_MIN,
        store: await redisStore({
          url:
            'redis://' +
            configService.get().redis.REDIS_HOST +
            ':' +
            configService.get().redis.REDIS_PORT,
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: ICacheServices,
      useClass: RedisCacheServices,
    },
  ],
  exports: [ICacheServices],
})
export class RedisCacheModule {}
