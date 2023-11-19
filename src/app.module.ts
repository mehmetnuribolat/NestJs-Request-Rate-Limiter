import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from './configuration';
import { DataServicesModule } from './app/services/data-services/data-services.module';
import { CacheServicesModule } from './app/services/cache-services/cache-services.module';
import { TerminusModule } from '@nestjs/terminus';
import { ReqRateLimiterUseCasesModule } from './app/use-cases/req-rate-limiter/req-rate-limiter.module';
import {
  AppController,
  PrivateController,
  PublicController,
} from './app/adapter/controllers';
import {
  AuthenticationMiddleware,
  PrivateReqRateLimiterMiddleware,
  PublicReqRateLimiterMiddleware,
} from './app/adapter/middleware';
import { AuthUseCasesModule } from './app/use-cases/auth/auth-use-cases.module';
import { AuthUseCases } from './app/use-cases/auth/auth.use-case';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    ConfigurationModule,
    DataServicesModule,
    AuthUseCasesModule,
    CacheServicesModule,
    ReqRateLimiterUseCasesModule,
    TerminusModule,
  ],
  controllers: [AppController, PublicController, PrivateController],
  providers: [AuthUseCases],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware, PrivateReqRateLimiterMiddleware)
      .forRoutes('private');

    consumer.apply(PublicReqRateLimiterMiddleware).forRoutes('public');
  }
}
