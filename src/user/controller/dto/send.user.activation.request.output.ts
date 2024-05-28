import { ApiProperty } from '@nestjs/swagger';
import PartialClass from '../../../domain/base/partial.class';
import SendUserActivationEmailUseCaseOutput from '../../usecases/dtos/send.user.activation.email.usecase.output';

export class SendUserActivationRequestOutput extends PartialClass {
  @ApiProperty({
    description: 'User e-mail',
  })
  email: string;

  @ApiProperty({
    description: 'User request date',
  })
  processedAt: Date;

  static fromUseCaseResponse(data: SendUserActivationEmailUseCaseOutput) {
    return new SendUserActivationRequestOutput({
      ...data,
    });
  }
}
