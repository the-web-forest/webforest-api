import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export default class UserUpdateRequestInput {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'User firstName',
    required: false,
  })
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'User lastName',
    required: false,
  })
  lastName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'User nickName',
    required: false,
  })
  nickName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'User password',
    required: false,
  })
  password?: string;
}
