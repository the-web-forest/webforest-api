import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendUserActivationRequestInput {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User e-mail',
  })
  email: string;
}
