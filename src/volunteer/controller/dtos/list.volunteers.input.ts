import { IsOptional, IsString } from 'class-validator';
import PagionationInput from '../../../base/controller/dtos/pagination.input';
import { ApiProperty } from '@nestjs/swagger';

export default class ListVolunteersInput extends PagionationInput {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Name of the volunteer',
    required: false,
  })
  name?: string;
}
