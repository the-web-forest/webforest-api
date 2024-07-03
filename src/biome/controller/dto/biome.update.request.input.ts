import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class BiomeUpdateRequestInput {
  @IsString()
  @ApiProperty({
    description: 'Biome name',
  })
  name: string;
}
