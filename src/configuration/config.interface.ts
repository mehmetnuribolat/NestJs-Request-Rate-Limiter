export interface ConfigAuth {
  JWT_EXPIRES_IN: string;
  JWT_ACCESS_TOKEN_SECRET: string;
  JWT_AUDIENCE: string;
  JWT_ISSUER: string;
}

export interface ConfigSwagger {
  SWAGGER_USERNAME: string;
  SWAGGER_PASSWORD: string;
}

export interface ConfigRedis {
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_CACHE_EXPIRE_MS: number;
}
export interface ConfigRateLimiter {
  TOKEN_RATE_LIMIT_REQ: number;
  TOKEN_RATE_LIMIT_REQ_MS: number;
  IP_RATE_LIMIT_REQ: number;
  IP_RATE_LIMIT_REQ_MS: number;
}

export interface ConfigDatabase {
  MONGO_CONNECTION_STRING: string;
}

export interface ConfigData {
  env: string;
  host: string;
  port: number;
  db: ConfigDatabase;
  redis: ConfigRedis;
  rate_limiter: ConfigRateLimiter;
  swagger: ConfigSwagger;
  auth: ConfigAuth;
  logLevel: string;
}
