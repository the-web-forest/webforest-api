import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class UpdateBiomeRequestInput {
  @IsString()
  @ApiProperty({
    description: 'Biome name',
  })
  name: string;
}
