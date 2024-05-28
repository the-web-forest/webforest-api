import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateUserActivationRequestInput {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User validation hash',
  })
  hash: string;
}
