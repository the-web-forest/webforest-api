import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class UserUpdateRequestInput {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'User firstName',
  })
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'User lastName',
  })
  lastName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'User nickName',
  })
  nickName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'User password',
  })
  password?: string;
}
