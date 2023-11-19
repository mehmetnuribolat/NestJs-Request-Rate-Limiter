export abstract class ICacheRepository {
  abstract getAllKeysByPattern(keyPattern: string): Promise<string[]>;
  abstract getTTLByKey(key: string): Promise<number>;
  abstract getAllValuesWithMulKeys(keys: string[]): Promise<any[]>;
  abstract getByKey(keyValue: string): Promise<any>;
  abstract cacheItem(key: string, value: number, ttl: number): Promise<void>;
  abstract delItem(key: string): Promise<void>;
}
