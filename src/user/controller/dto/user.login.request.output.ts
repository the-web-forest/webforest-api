import { ApiProperty } from '@nestjs/swagger';
import UserLoginUseCaseOutput from '../../usecases/dtos/user.login.usecase.output';
import PartialClass from '../../../domain/base/partial.class';

export default class UserLoginRequestOutput extends PartialClass {
  @ApiProperty({
    description: 'User token',
  })
  token: string;

  @ApiProperty({
    description: 'User token expiration date',
  })
  expiration: Date;

  static fromUseCaseResponse(data: UserLoginUseCaseOutput) {
    return new UserLoginRequestOutput({
      token: data.token,
      expiration: data.expiration
    });
  }
}
