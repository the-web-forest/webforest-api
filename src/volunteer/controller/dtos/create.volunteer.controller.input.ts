import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class CreateVolunteerControllerInput {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Name of the new volunteer',
        
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({
        description: 'Name of the new volunteer'
    })
    linkedInUrl: string;
}