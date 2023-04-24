import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumberString, IsString } from 'class-validator';

export default class UserDTO {
  @ApiProperty()
  @IsNumberString()
  id: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
