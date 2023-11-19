import { Module } from '@nestjs/common';
import { RedisCacheModule } from 'src/app/frameworks/cache-services/redis/redis-cache-service.module';

@Module({
  imports: [RedisCacheModule],
  exports: [RedisCacheModule],
})
export class CacheServicesModule {}
