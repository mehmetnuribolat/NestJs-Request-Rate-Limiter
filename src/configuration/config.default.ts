import { ConfigData } from './config.interface';

export const DEFAULT_CONFIG: ConfigData = {
  env: 'development',
  host: 'localhost',
  port: Number(process.env.PORT || 3000),
  db: {
    MONGO_CONNECTION_STRING: '',
  },
  auth: {
    JWT_EXPIRES_IN: '1d',
    JWT_ACCESS_TOKEN_SECRET: '',
    JWT_AUDIENCE: 'rate_limit_app',
    JWT_ISSUER: 'rate_limit_app',
  },
  swagger: {
    SWAGGER_USERNAME: '',
    SWAGGER_PASSWORD: '',
  },
  redis: {
    REDIS_HOST: '127.0.0.1',
    REDIS_PORT: 6379,
    REDIS_CACHE_EXPIRE_MS: 3600000, //60MIN
  },
  rate_limiter: {
    TOKEN_RATE_LIMIT_REQ: 200,
    TOKEN_RATE_LIMIT_REQ_MS: 60,
    IP_RATE_LIMIT_REQ: 100,
    IP_RATE_LIMIT_REQ_MS: 60,
  },
  logLevel: '',
};
