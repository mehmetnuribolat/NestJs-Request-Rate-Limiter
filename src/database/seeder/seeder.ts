import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
} from '../../app/frameworks/data-services/mongo/model';
import { UsersSeeder } from './users.seeder';

seeder({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/request-rate-limiter'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
}).run([UsersSeeder]);
