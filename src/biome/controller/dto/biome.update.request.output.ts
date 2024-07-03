import { ApiProperty } from '@nestjs/swagger';
import PartialClass from '../../../domain/base/partial.class';
import { IsString } from 'class-validator';
import UpdateBiomeUseCaseOutPut from '../../usecases/dtos/update.biome.usecase.output';
export default class BiomeUpdateRequestOutput extends PartialClass {
  @IsString()
  @ApiProperty({
    description: 'Biome name',
  })
  name: string;

  static fromUseCaseResponse(response: UpdateBiomeUseCaseOutPut) {
    return new BiomeUpdateRequestOutput({
      ...response,
    });
  }
}
