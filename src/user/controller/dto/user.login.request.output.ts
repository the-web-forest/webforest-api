import { ApiProperty } from "@nestjs/swagger";
import UserLoginUseCaseOutput from "../../usecases/dtos/user.login.usecase.output";
import PartialClass from "../../../domain/base/partial.class";

export default class UserLoginRequestOutput extends PartialClass {
  @ApiProperty({
    description: 'User token'
  })
  token: string;

  static fromUseCaseResponse(data: UserLoginUseCaseOutput) {
    return new UserLoginRequestOutput({
      ...data
    })
  }
}