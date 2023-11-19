import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../services/data-services/data-services.module';
import { AuthUseCases } from './auth.use-case';

@Module({
  imports: [DataServicesModule],
  providers: [AuthUseCases],
  exports: [AuthUseCases],
})
export class AuthUseCasesModule {}
