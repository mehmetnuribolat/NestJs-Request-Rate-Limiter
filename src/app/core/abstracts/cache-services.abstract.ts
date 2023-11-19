import { ICacheRepository } from 'src/app/frameworks/cache-services/redis/repository/ICacheRepository.repository';

export abstract class ICacheServices {
  abstract cacheStorage: ICacheRepository;
}
