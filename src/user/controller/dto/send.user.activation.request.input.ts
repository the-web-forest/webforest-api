import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SendUserActivationRequestInput {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User e-mail'
  })
  email: string;
}