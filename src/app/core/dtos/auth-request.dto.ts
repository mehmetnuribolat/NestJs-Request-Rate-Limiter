import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthRequestDto {
  @ApiProperty({
    description: 'email',
    example: 'hello@gmail.com',
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsEmail()
  public email!: string;

  @ApiProperty({
    description: 'password',
    example: '23232323dsa',
    required: true,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  public password!: string;
}
