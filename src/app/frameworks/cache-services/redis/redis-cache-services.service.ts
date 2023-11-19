import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ICacheServices } from 'src/app/core/abstracts/cache-services.abstract';
import { CacheRepository, ICacheRepository } from './repository';

@Injectable()
export class RedisCacheServices
  implements ICacheServices, OnApplicationBootstrap
{
  public cacheStorage: ICacheRepository;

  constructor(@Inject(CACHE_MANAGER) private CacheRepository: Cache) {}

  onApplicationBootstrap() {
    this.cacheStorage = new CacheRepository(this.CacheRepository);
  }
}
