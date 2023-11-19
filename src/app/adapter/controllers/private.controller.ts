import { Controller, Get } from '@nestjs/common';
import { PrivateRoutes } from 'src/app/constants';

@Controller('private')
export class PrivateController {
  constructor() {}

  @Get(PrivateRoutes.requestOne.path)
  async requestOne() {
    return {
      message: 'Private Request One Successfull',
    };
  }

  @Get(PrivateRoutes.requestTwo.path)
  async requestTwo() {
    return {
      message: 'Private Request Two Successfull',
    };
  }

  @Get(PrivateRoutes.requestThree.path)
  async requestThree() {
    return {
      message: 'Private Request Three Successfull',
    };
  }
}
