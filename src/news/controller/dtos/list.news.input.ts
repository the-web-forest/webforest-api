import { IsOptional, IsString } from 'class-validator';
import PagionationInput from '../../../base/controller/dtos/pagination.input';
import { ApiProperty } from '@nestjs/swagger';

export default class ListNewsInput extends PagionationInput {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Title of the news',
    required: false,
  })
  title?: string;
}
