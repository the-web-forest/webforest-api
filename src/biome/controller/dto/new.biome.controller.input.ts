import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class NewBiomeControllerInput {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'New biome name',
  })
  name: string;
}
