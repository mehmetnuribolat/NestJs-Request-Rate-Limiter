import {
  ConfigAuth,
  ConfigData,
  ConfigDatabase,
  ConfigRateLimiter,
  ConfigRedis,
  ConfigSwagger,
} from './config.interface';
import { Injectable } from '@nestjs/common';
import { DEFAULT_CONFIG } from './config.default';
import { MongooseModuleOptions } from '@nestjs/mongoose';

@Injectable()
export class ConfigService {
  private config: ConfigData;
  constructor(data: ConfigData = DEFAULT_CONFIG) {
    this.config = data;
  }

  public loadFromEnv() {
    this.config = this.parseConfigFromEnv(process.env);
  }
  private parseConfigFromEnv(env: NodeJS.ProcessEnv): ConfigData {
    return {
      env: env.NODE_ENV || DEFAULT_CONFIG.env,
      host: env.HOST || DEFAULT_CONFIG.host,
      port: +env.PORT || DEFAULT_CONFIG.port,
      db: this.parseDBConfig(env, DEFAULT_CONFIG.db),
      redis: this.parseRedisConfig(env, DEFAULT_CONFIG.redis),
      rate_limiter: this.parseRateLimiterConfig(
        env,
        DEFAULT_CONFIG.rate_limiter,
      ),
      swagger: this.parseSwaggerConfig(env, DEFAULT_CONFIG.swagger),
      auth: this.parseAuthConfig(env, DEFAULT_CONFIG.auth),
      logLevel: env.LOG_LEVEL,
    };
  }

  private parseDBConfig(
    env: NodeJS.ProcessEnv,
    defaultConfig: Readonly<ConfigDatabase>,
  ) {
    return {
      MONGO_CONNECTION_STRING:
        env.MONGO_CONNECTION_STRING || defaultConfig.MONGO_CONNECTION_STRING,
    };
  }

  private parseAuthConfig(
    env: NodeJS.ProcessEnv,
    defaultConfig: Readonly<ConfigAuth>,
  ) {
    return {
      JWT_EXPIRES_IN: env.JWT_EXPIRES_IN || defaultConfig.JWT_EXPIRES_IN,
      JWT_ACCESS_TOKEN_SECRET:
        env.JWT_ACCESS_TOKEN_SECRET || defaultConfig.JWT_ACCESS_TOKEN_SECRET,
      JWT_AUDIENCE: env.JWT_AUDIENCE || defaultConfig.JWT_AUDIENCE,
      JWT_ISSUER: env.JWT_AUDIENCE || defaultConfig.JWT_ISSUER,
    };
  }

  private parseRedisConfig(
    env: NodeJS.ProcessEnv,
    defaultConfig: Readonly<ConfigRedis>,
  ) {
    const redisConfig: ConfigRedis = {
      REDIS_HOST: env.REDIS_HOST || defaultConfig.REDIS_HOST,
      REDIS_PORT: +env.REDIS_PORT || defaultConfig.REDIS_PORT,
      REDIS_CACHE_EXPIRE_MS:
        +env.REDIS_CACHE_EXPIRE_MS || defaultConfig.REDIS_CACHE_EXPIRE_MS,
    };

    return redisConfig;
  }

  private parseRateLimiterConfig(
    env: NodeJS.ProcessEnv,
    defaultConfig: Readonly<ConfigRateLimiter>,
  ) {
    return {
      TOKEN_RATE_LIMIT_REQ:
        +env.TOKEN_RATE_LIMIT_REQ || defaultConfig.TOKEN_RATE_LIMIT_REQ,
      TOKEN_RATE_LIMIT_REQ_MS:
        +env.TOKEN_RATE_LIMIT_REQ_MS || defaultConfig.TOKEN_RATE_LIMIT_REQ_MS,
      IP_RATE_LIMIT_REQ:
        +env.IP_RATE_LIMIT_REQ || defaultConfig.IP_RATE_LIMIT_REQ,
      IP_RATE_LIMIT_REQ_MS:
        +env.IP_RATE_LIMIT_REQ_MS || defaultConfig.IP_RATE_LIMIT_REQ_MS,
    };
  }

  private parseSwaggerConfig(
    env: NodeJS.ProcessEnv,
    defaultConfig: Readonly<ConfigSwagger>,
  ) {
    return {
      SWAGGER_USERNAME: env.SWAGGER_USERNAME || defaultConfig.SWAGGER_USERNAME,
      SWAGGER_PASSWORD: env.SWAGGER_PASSWORD || defaultConfig.SWAGGER_PASSWORD,
    };
  }
  public getMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.config.db.MONGO_CONNECTION_STRING,
    };
  }
  public get(): Readonly<ConfigData> {
    return this.config;
  }
}
