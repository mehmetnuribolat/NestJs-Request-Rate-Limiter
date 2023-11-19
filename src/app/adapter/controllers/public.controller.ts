import { Controller, Get } from '@nestjs/common';
import { PublicRoutes } from 'src/app/constants';

@Controller('public')
export class PublicController {
  constructor() {}

  @Get(PublicRoutes.requestOne.path)
  async requestOne() {
    return {
      message: 'Public Request One',
    };
  }

  @Get(PublicRoutes.requestTwo.path)
  async requestTwo() {
    return {
      message: 'Public Request Two',
    };
  }

  @Get(PublicRoutes.requestThree.path)
  async requestThree() {
    return {
      message: 'Public Request Three',
    };
  }
}
