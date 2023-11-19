import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { createSwaggerDocument } from './docs/swagger';
import { AppClusterService } from './app-cluster-service';

async function bootstrap() {
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule);

  //Insert Swagger Documentation
  //createSwaggerDocument(app);

  await app.listen(port);
  console.log(`SERVER (${process.pid}) IS RUNNING ON `, port);
}

// bootstrap();
AppClusterService.clusterize(bootstrap);
