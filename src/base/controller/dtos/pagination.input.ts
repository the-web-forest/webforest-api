import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min, Max } from 'class-validator';

export default class PagionationInput {
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  @ApiProperty({
    description: 'Page',
    required: true,
    minimum: 1,
  })
  page: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => parseInt(value, 10))
  @ApiProperty({
    description: 'Items per page',
    required: true,
    minimum: 1,
    maximum: 100,
  })
  itemsPerPage: number;
}
