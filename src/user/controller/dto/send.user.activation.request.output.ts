import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import PartialClass from "src/domain/base/partial.class";

export class SendUserActivationRequestOutput extends PartialClass {
  @ApiProperty({
    description: 'User e-mail'
  })
  email: string;

  @ApiProperty({
    description: 'User request date'
  })
  processedAt: Date;

  static fromUseCaseResponse(data: SendUserActivationRequestOutput) {
    return new SendUserActivationRequestOutput({
      ...data
    })
  }
}