import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ValidateUserActivationRequestInput {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User validation hash'
  })
  hash: string;
}