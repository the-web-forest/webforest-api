import { ApiProperty } from '@nestjs/swagger';
import PartialClass from '../../../domain/base/partial.class';
import ValidateUserActivationEmailUseCaseOutput from '../../usecases/dtos/validate.user.activation.email.usecase.output';

export class ValidateUserActivationRequestOutput extends PartialClass {
  @ApiProperty({
    description: 'User e-mail',
  })
  email: string;

  @ApiProperty({
    description: 'User request date',
  })
  processedAt: Date;

  static fromUseCaseResponse(data: ValidateUserActivationEmailUseCaseOutput) {
    return new ValidateUserActivationRequestOutput({
      ...data,
    });
  }
}
