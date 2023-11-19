import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model';
import { ConfigurationModule, ConfigService } from '../../../../configuration';
import { IDataServices } from '../../../../app/core/abstracts';
import { MongoDataServices } from './mongo-data-service.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: (configService: ConfigService) => {
        return configService.getMongooseOptions();
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServicesModule {}
