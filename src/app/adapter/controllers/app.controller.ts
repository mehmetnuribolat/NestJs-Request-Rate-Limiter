import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

@ApiTags('Health Check')
@Controller('/health')
export class AppController {
  constructor(
    private readonly health: HealthCheckService,
    private db: MongooseHealthIndicator,
  ) {}

  @ApiOperation({
    summary: 'Health Check Service',
    description: 'Checks the health of Mongoose',
  })
  @ApiOkResponse({ description: 'returns the health check result' })
  @HealthCheck()
  @Get()
  checkMongo() {
    return this.health.check([async () => this.db.pingCheck('mongodb')]);
  }

  //   @ApiOperation({
  //     summary: 'Health Check Service',
  //     description: 'Checks the health of Redis Cache',
  //   })
  //   @ApiOkResponse({ description: 'returns the health check result' })
  //   @HealthCheck()
  //   @Get()
  //   checkRedis() {
  //     return this.health.check([async () => this.db.pingCheck('mongodb')]);
  //   }
}
