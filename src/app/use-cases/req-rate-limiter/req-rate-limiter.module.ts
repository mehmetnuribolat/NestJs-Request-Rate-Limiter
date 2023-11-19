import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../../../configuration';
import { CacheServicesModule } from 'src/app/services/cache-services/cache-services.module';
import { ReqRateLimiterUseCases } from './req-rate-limiter.use-case';

@Module({
  imports: [CacheServicesModule, ConfigurationModule],
  providers: [ReqRateLimiterUseCases],
  exports: [ReqRateLimiterUseCases],
})
export class ReqRateLimiterUseCasesModule {}
