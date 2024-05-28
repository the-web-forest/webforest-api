import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class UserLoginRequestInput {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({
      description: 'User email'
    })
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
      description: 'User email'
    })
    password: string;
}