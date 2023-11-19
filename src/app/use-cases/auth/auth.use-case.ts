import { Injectable } from '@nestjs/common/decorators';
import { NotFoundException } from '@nestjs/common';
import { IDataServices } from '../../core/abstracts';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthUseCases {
  constructor(private readonly dataServices: IDataServices) {}

  async validateUser(
    username: string,
    password: string,
    api_key: string,
  ): Promise<boolean> {
    const user = await this.dataServices.users.getByEmail(username);
    if (!user) {
      throw new NotFoundException();
    }

    let isPwMatch = false;
    isPwMatch = await bcrypt.compare(password, user.password);
    if (isPwMatch) {
      if (api_key === user.api_key) {
        return true;
      }
    }
    return false;
  }
}
