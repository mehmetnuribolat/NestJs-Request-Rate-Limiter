import { Cache } from 'cache-manager';
import { ICacheRepository } from './index';

export class CacheRepository implements ICacheRepository {
  private _repository: Cache;
  constructor(repository: Cache) {
    this._repository = repository;
  }

  async getAllKeysByPattern(keyPattern: string): Promise<string[]> {
    return await this._repository.store.keys(keyPattern);
  }

  async getTTLByKey(key: string): Promise<number> {
    return await this._repository.store.ttl(key);
  }

  async getAllValuesWithMulKeys(keys: string[]): Promise<any[]> {
    return await this._repository.store.mget(...keys);
  }

  async getByKey(keyValue: string): Promise<any> {
    return await this._repository.get(keyValue);
  }

  async cacheItem(key: string, value: number, ttl: number): Promise<void> {
    await this._repository.set(key, value, ttl);
  }
  async delItem(key: string): Promise<void> {
    await this._repository.del(key);
  }
}
