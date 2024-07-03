import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import UpdateUserUseCaseOutput from '../../usecases/dtos/update.user.usecase.output';
import PartialClass from '../../../domain/base/partial.class';

export default class UserUpdateRequestOutput extends PartialClass {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'User firstName',
  })
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'User lastName',
  })
  lastName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'User nickName',
  })
  nickName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'User nickName',
  })
  updatedAt?: Date;

  static fromUseCaseResponse(response: UpdateUserUseCaseOutput) {
    return new UserUpdateRequestOutput({
      ...response,
    });
  }
}
