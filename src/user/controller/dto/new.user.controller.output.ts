import { ApiProperty } from '@nestjs/swagger';
import CreateUserUseCaseOutput from '../../../user/usecases/dtos/create.user.usecase.output';
import PartialClass from '../../../domain/base/partial.class';

export default class NewUserControllerOutput extends PartialClass {
  @ApiProperty({
    description: 'User id',
  })
  id: number;
  @ApiProperty({
    description: 'User first name',
  })
  firstName: string;
  @ApiProperty({
    description: 'User last name',
  })
  lastName: string;
  @ApiProperty({
    description: 'User nick name',
  })
  nickName: string;
  @ApiProperty({
    description: 'User email',
  })
  email: string;
  @ApiProperty({
    description: 'User created date',
  })
  createdAt: Date;
  @ApiProperty({
    description: 'User updated date',
  })
  updatedAt: Date;

  static fromUseCaseResponse(data: CreateUserUseCaseOutput) {
    return new CreateUserUseCaseOutput({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      nickName: data.nickName,
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
